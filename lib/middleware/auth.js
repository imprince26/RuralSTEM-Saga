import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function authenticate(handler) {
  return async (request) => {
    try {
      // Get token from Authorization header or cookie
      let token = request.headers.get('authorization')?.replace('Bearer ', '');
      
      if (!token) {
        // Try to get token from cookie
        token = request.cookies.get('auth-token')?.value;
      }

      if (!token) {
        return NextResponse.json(
          { error: 'Access token is required' },
          { status: 401 }
        );
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Add user info to request
      request.user = decoded;
      
      return handler(request);
    } catch (error) {
      console.error('Authentication error:', error);
      
      if (error.name === 'JsonWebTokenError') {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }
      
      if (error.name === 'TokenExpiredError') {
        return NextResponse.json(
          { error: 'Token has expired' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

export function optionalAuth(handler) {
  return async (request) => {
    try {
      // Get token from Authorization header or cookie
      let token = request.headers.get('authorization')?.replace('Bearer ', '');
      
      if (!token) {
        // Try to get token from cookie
        token = request.cookies.get('auth-token')?.value;
      }

      if (token) {
        try {
          // Verify token
          const decoded = jwt.verify(token, JWT_SECRET);
          // Add user info to request
          request.user = decoded;
        } catch (error) {
          // Token is invalid but continue without auth
          console.log('Optional auth failed:', error.message);
        }
      }
      
      return handler(request);
    } catch (error) {
      console.error('Optional authentication error:', error);
      return handler(request);
    }
  };
}