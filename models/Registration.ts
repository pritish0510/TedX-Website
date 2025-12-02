export type UserRole = 'Student' | 'Faculty' | 'Guest' | 'Professional';

export interface IRegistration {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RegistrationInput {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  message: string;
}

const VALID_ROLES: UserRole[] = ['Student', 'Faculty', 'Guest', 'Professional'];

// Validation helper
export function validateRegistration(data: RegistrationInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.push('Please enter a valid email');
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(data.phone)) {
    errors.push('Please enter a valid phone number');
  }

  if (!data.role || !VALID_ROLES.includes(data.role)) {
    errors.push('Please select a valid role');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Please tell us why you want to attend');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}