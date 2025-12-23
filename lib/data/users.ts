
export type UserRole = 'student' | 'professor' | 'admin';

export interface User {
  id: string;
  name: string;
  username: string; 
  password: string;
  role: UserRole;
  gpa?: number;    
}

export const users: User[] = [
  {
    id: 's1',
    name: 'Osman Taher',
    username: '20233739',
    password: '12345',
    role: 'student',
    gpa: 2.5,
  },
  {
    id: 's2',
    name: 'mohamed shaheen',
    username: '20233738',
    password: '12345',
    role: 'student',
    gpa: 3.2,
  },
  {
    id: 'p1',
    name: 'Professor Amani',
    username: 'amani',
    password: '12345',
    role: 'professor',
  },
  {
    id: 'a1',
    name: 'Admin Rawya',
    username: 'rawya',
    password: '12345',
    role: 'admin',
  },
];

export const validateUser = (username: string, pass: string, role: string) => {
  return users.find(u => u.username === username && u.password === pass && u.role === role);
};