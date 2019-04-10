import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Directive ( {
  selector: '[inSerial]', providers: [ {
    provide    : NG_VALUE_ACCESSOR,
    useExisting: forwardRef ( () => SerialDirective ),
    multi      : true
  }
  ]
} )
export class SerialDirective implements ControlValueAccessor {
  private _onTouched: any;
  private _onChange: any;

  constructor( private renderer: Renderer2, private elemRef: ElementRef ) {
  }

  registerOnChange( fn: any ): void {
    this._onChange = fn;
  }

  registerOnTouched( fn: any ): void {
    this._onTouched = fn;
  }

  writeValue( value: string ): void {
    if ( !isNullOrUndefined ( value ) ) {
      this.renderer.setProperty ( this.elemRef.nativeElement, 'value',
        value.replace ( /\-/g, '' )
             .replace ( /(.{3})/g, '$1-' ) );
    }
  }

  @HostListener ( 'blur' )
  blur() {
    if ( !!this._onTouched ) {
      this._onTouched ();
    }
  }

  @HostListener ( 'change', [ '$event' ] )
  valueChange( $event ) {
    this.writeValue ( $event.target.value );
    if ( !!this._onChange ) {
      this._onChange ( $event.target.value.replace ( /\-/g, '' ) );
    }
  }

}
