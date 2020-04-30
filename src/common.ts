class Loader {
  loaded = false;
  loadImage = (url: string) => {
    return new Promise((resolve) => {
      var image = new Image();
      image.src = url;
      image.onload = () => {
        this.loaded = true;
        resolve(image);
      };
    });
  };
}

export default Loader;
