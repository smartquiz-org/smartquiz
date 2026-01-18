import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative" [class.opacity-50]="disabled">
      <input
        [type]="type"
        [id]="inputId"
        [placeholder]="' '"
        [disabled]="disabled"
        [readonly]="readonly"
        [attr.data-testid]="testId"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="focused.set(true)"
        class="peer w-full px-4 pt-5 pb-2 bg-surface border rounded-lg text-text-primary placeholder-transparent transition-all duration-200 focus:outline-none focus:ring-2"
        [class.border-border]="!error"
        [class.focus:border-primary]="!error"
        [class.border-error]="error"
        [class.focus:border-error]="error"
      />
      <label
        [for]="inputId"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:translate-y-0"
        [class.text-primary]="focused() && !error"
        [class.text-error]="error">
        {{ label }}
      </label>
      @if (error) {
        <p class="mt-1 text-sm text-error" [attr.data-testid]="testId + '-error'">{{ error }}</p>
      }
      @if (hint && !error) {
        <p class="mt-1 text-sm text-text-secondary">{{ hint }}</p>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() testId = 'ui-input';

  value = '';
  focused = signal(false);
  inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }
}
