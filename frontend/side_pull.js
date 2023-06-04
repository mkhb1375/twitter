class SidePull {
    constructor(left, head, botton, form, body,doc) {
        // side
        this.$left = $(left);
        this.$head = $(head);
        this.$ul = this.$head.find('ul');
        this.$left.on('click', this.pull.bind(this));
        // bottom
        this.$body = $(body);
        this.$overlay = $(this.$body.find('.overlay'));
        this.$doc = $(doc);
        this.$botton = $(botton);
        this.$form = $(form);
        this.$botton.on('click', this.form.bind(this));
        this.$overlay.on('click', this.form.bind(this));
        
        
        // Mobile swipe gesture
        this.startX = 0;
        this.startY = 0;
        this.threshold = 70; 
        
        this.$doc.on('touchstart', this.handleTouchStart.bind(this));
        this.$doc.on('touchmove', this.handleTouchMove.bind(this));
    }

    handleTouchStart(event) {
        this.startX = event.originalEvent.touches[0].clientX;
        this.startY = event.originalEvent.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!event.originalEvent.touches || event.originalEvent.touches.length === 0) {
            return;
        }

        if (event.originalEvent.touches.length > 1) {
            
            return;
        }

        const currentX = event.originalEvent.touches[0].clientX;
        const currentY = event.originalEvent.touches[0].clientY;
        const deltaX = currentX - this.startX;
        const deltaY = currentY - this.startY;
        if(Math.abs(deltaY) < 30){
        if (deltaX > this.threshold) {
            
            this.$ul.removeClass('hidden');
        }
        if (deltaX < 0 && Math.abs(deltaX) > this.threshold){
            this.$ul.addClass('hidden');
        }
    }
        
        if (deltaY > 80 && this.$form.hasClass('on')) {
            this._removeForm();
        }
    }

    pull(event) {
        event.stopPropagation();
        if (this.$ul.hasClass('hidden')) {
            this.$ul.removeClass('hidden');
        }
    }

    form(event) {
        if (!this.$form.hasClass('on')) {
            this.$botton.html('<h1>Close</h1>');
            this.$botton.css('background1-color', 'rgb(1, 72, 172)');
            this.$overlay.css('bottom', -this.$body.height());
            this.$form.addClass('on');

            this.$overlay.addClass('on');
            this.$body.css('overflow', 'hidden');
        } else {
            this._removeForm();
        }
    }
    _removeForm(){
    this.$overlay.css('bottom', '0');
    this.$botton.css('background-color', 'rgb(1, 72, 172)');
    this.$botton.html('<h1>Post Tweet</h1>');
    this.$form.removeClass('on');
    this.$overlay.removeClass('on');
    this.$body.css('overflow', 'auto');
    }
}

export default SidePull;
