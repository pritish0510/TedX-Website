export interface IContact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Validation helper
export function validateContact(data: ContactInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.push('Please enter a valid email');
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}