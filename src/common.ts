class Loader {
    loaded = false;
    loadImage = (url: string) => {
        var image = new Image();
        image.src = url;
        image.onload = this.itemLoaded;
        return image;
    }
    itemLoaded = () => {
        this.loaded = true;
    }
}

export default Loader;