import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    visible: true
  },
  {
    name: 'Courses',
    path: '/courses',
    element: <Courses />,
    visible: true
  },
  {
    name: 'Course Detail',
    path: '/courses/:slug',
    element: <CourseDetail />,
    visible: false
  },
  {
    name: 'Blog',
    path: '/blog',
    element: <Blog />,
    visible: true
  },
  {
    name: 'Blog Detail',
    path: '/blog/:slug',
    element: <BlogDetail />,
    visible: false
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
    visible: true
  }
];

export default routes;