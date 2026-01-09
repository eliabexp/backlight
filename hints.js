export class Hints {
    constructor() { 
        this.isAnimatingTexts = false;
        this.textAnimationTimeout = null;
    }

    show(duration) {
        const title = document.querySelector('.title');
        const instructions = document.querySelector('.instructions');

        const initial = (from) => ({
            opacity: 0,
            transform: `translateY(${from === 'top' ? '-60px' : '60px'})`
        });
        const animate = {
            opacity: 1,
            transform: 'translateY(0px)'
        };

        if (!this.isAnimatingTexts) {
            this.isAnimatingTexts = true;

            title.animate([initial('top'), animate], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            instructions.animate([initial(), animate], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
        } else {
            clearTimeout(this.textAnimationTimeout);
        }

        if (!duration) return;
        
        this.textAnimationTimeout = setTimeout(() => {
            title.animate([animate, initial('top')], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            instructions.animate([animate, initial()], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });

            this.isAnimatingTexts = false;
        }, duration);
    }
}