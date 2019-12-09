import { ZoomEffectDirective } from './zoom-effect.directive';
import {element} from "protractor";
import {ElementRef} from "@angular/core";
import {Size} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator";

describe('ZoomEffectDirective', () => {
  // @ts-ignore
  it('should create an instance', (size: Int) => {
    const directive = new ZoomEffectDirective(size);
    expect(directive).toBeTruthy();
  });
});
