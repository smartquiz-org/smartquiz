import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header.component';
import { FooterComponent } from './layouts/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-background">
      <app-header />
      <main class="flex-1 container mx-auto px-4 py-6">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'SmartQuiz';
}
