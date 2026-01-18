import { Injectable, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'smartquiz-theme';
  private document = inject(DOCUMENT);

  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme on change
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
    });
  }

  private getInitialTheme(): Theme {
    // Check localStorage first
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    }
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    
    // Default to dark
    return 'dark';
  }

  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') {
      this.document.documentElement.setAttribute('data-theme', theme);
      
      // Also toggle class for Tailwind dark mode if needed
      if (theme === 'dark') {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    }
    
    // Persist to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  toggle(): void {
    const newTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(newTheme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
