import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'digital-carrossel-chips',
    templateUrl: './carrossel-chips.component.html',
    styleUrls: ['./carrossel-chips.component.scss']
})
export class CarrosselChipsComponent implements OnInit, AfterContentChecked {

    @Input() chips: string[] = [];
    @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;

    isActiveScroll: boolean = false;
    isChipsLoaded: boolean = false;

    readonly SCROLL_SIZE: number = 150;

    ngOnInit(): void {

    }

    ngAfterContentChecked(): void {
        this.isActiveScroll = this.isAlreadyActiveScroll();
    }

    public onPreviousPosition(): void {
        this.panel.nativeElement.scrollLeft -= this.SCROLL_SIZE;
    }

    public onNextPosition(): void {
        this.panel.nativeElement.scrollLeft += this.SCROLL_SIZE;
    }

    /**
     * @description Verifica se o scroll está ativo
     * @author Douglas da Silva Monteles
     */
    public isAlreadyActiveScroll(): boolean {
        if (this.panel) {
            const { scrollWidth, clientWidth } = this.panel?.nativeElement;
            this.isChipsLoaded = true;
            return scrollWidth > clientWidth;
        }

        this.isChipsLoaded = true;
        return false;
    }

}
