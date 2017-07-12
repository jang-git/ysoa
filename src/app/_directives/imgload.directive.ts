import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { AlibaichuanService } from '../service/alibaichuan.service'
@Directive({ selector: 'img[loaded]' })
export class ImgLoadedDirective {
  @Input()
 loaded : any

 @Input()
 data : any

 constructor(renderer : Renderer, el : ElementRef, private alibaichuanService:AlibaichuanService) {
   renderer.listen(el.nativeElement, 'load', () => {
     alibaichuanService.updateMessagesScroll.next('去滚动');
   });
 }

 load() {
   console.log('b');
 }
}
