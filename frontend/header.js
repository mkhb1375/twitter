class Headerfix {

constructor(ele,body){
    this.$body = body;
    this.$ele = ele;
    this.$ul = this.$ele.find('ul');
    this.$image = this.$ele.find("image");
    this.$ele.on('click', this.$image , this.hamburger.bind(this));
    this.$body.on('click', this.close.bind(this));
}
hamburger(event){
    event.stopPropagation();

    if(this.$ul.hasClass("hidden")){
        this.$ul.removeClass("hidden")
    }
    else{
        this.$ul.addClass("hidden")
    }

    
}
close(event){

    if (!this.$ul.hasClass("hidden")) {
        this.$ul.addClass("hidden")
    }
}
}

export default Headerfix;