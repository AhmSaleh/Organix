export default function createImageFromBlob(image: Blob, mutableImage: any) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        mutableImage = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }