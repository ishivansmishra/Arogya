/*
  # Initial Schema for ArogyaMitr Health Platform

  1. New Tables
    - users (extends auth.users)
      - profile information
      - preferences
      - role (patient/doctor/admin)
    
    - doctors
      - professional details
      - availability
      - specializations
    
    - appointments
      - booking details
      - status tracking
      - video consultation links
    
    - health_records
      - BMI history
      - water intake logs
      - secure medical documents
    
    - blog_posts
      - health articles
      - categories
      - author details

  2. Security
    - RLS policies for each table
    - Role-based access control
    - Secure medical data handling
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE consultation_type AS ENUM ('in_person', 'video');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'patient',
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  language TEXT DEFAULT 'en',
  dark_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Doctors profile
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  specialization TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience_years INTEGER,
  license_number TEXT UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  consultation_fee DECIMAL(10,2),
  about TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Doctor availability
CREATE TABLE IF NOT EXISTS doctor_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID REFERENCES doctors(id),
  day_of_week INTEGER NOT NULL, -- 0-6 for Sunday-Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES users(id),
  doctor_id UUID REFERENCES doctors(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status appointment_status DEFAULT 'pending',
  consultation_type consultation_type NOT NULL,
  video_link TEXT,
  symptoms TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Health Records
CREATE TABLE IF NOT EXISTS health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  record_type TEXT NOT NULL,
  record_date DATE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Health Tips
CREATE TABLE IF NOT EXISTS health_tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_tips ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Doctors can read their own profile
CREATE POLICY "Doctors can read own profile" ON doctors
  FOR SELECT USING (auth.uid() = user_id);

-- Doctors can update their own profile
CREATE POLICY "Doctors can update own profile" ON doctors
  FOR UPDATE USING (auth.uid() = user_id);

-- Doctors can manage their availability
CREATE POLICY "Doctors manage availability" ON doctor_availability
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM doctors
      WHERE doctors.id = doctor_availability.doctor_id
      AND doctors.user_id = auth.uid()
    )
  );

-- Patients can read doctor availability
CREATE POLICY "Public can view doctor availability" ON doctor_availability
  FOR SELECT USING (true);

-- Appointments policies
CREATE POLICY "Users can read own appointments" ON appointments
  FOR SELECT USING (
    auth.uid() = patient_id OR
    EXISTS (
      SELECT 1 FROM doctors
      WHERE doctors.id = appointments.doctor_id
      AND doctors.user_id = auth.uid()
    )
  );

-- Health records are private to the user
CREATE POLICY "Users can manage own health records" ON health_records
  FOR ALL USING (auth.uid() = user_id);

-- Blog posts can be read by anyone if published
CREATE POLICY "Anyone can read published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Authors can manage their own posts
CREATE POLICY "Authors can manage own posts" ON blog_posts
  FOR ALL USING (auth.uid() = author_id);

-- Health tips are public
CREATE POLICY "Public can view health tips" ON health_tips
  FOR SELECT USING (is_active = true);

-- Admins can manage health tips
CREATE POLICY "Admins can manage health tips" ON health_tips
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_health_records_user ON health_records(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at);