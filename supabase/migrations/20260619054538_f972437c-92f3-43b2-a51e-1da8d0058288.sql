
-- Roles enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins read all profiles" ON public.profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile + default user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Demo Requests
CREATE TABLE public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  class_level TEXT,
  board TEXT,
  preferred_time TEXT,
  course_slug TEXT,
  teacher_slug TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.demo_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.demo_requests TO authenticated;
GRANT ALL ON public.demo_requests TO service_role;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a demo request" ON public.demo_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage demo requests" ON public.demo_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update demo requests" ON public.demo_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete demo requests" ON public.demo_requests FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Waitlist
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  interested_course TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join waitlist" ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read waitlist" ON public.waitlist FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete waitlist" ON public.waitlist FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
