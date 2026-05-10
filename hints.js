class Hints {
    title = document.querySelector('.title');
    instructions = document.querySelector('.instructions');
    isAnimatingTexts = false;
    textAnimationTimeout = null;

    constructor() {}

    show(duration) {
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

            this.title.animate([initial('top'), animate], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            this.instructions.animate([initial(), animate], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
        } else {
            clearTimeout(this.textAnimationTimeout);
        }

        if (!duration) return;

        this.textAnimationTimeout = setTimeout(() => {
            const titleAnim = this.title.animate([animate, initial('top')], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            this.instructions.animate([animate, initial()], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });

            titleAnim.onfinish = () => {
                this.isAnimatingTexts = false;
            };
        }, duration);
    }
}

export const hints = new Hints();
