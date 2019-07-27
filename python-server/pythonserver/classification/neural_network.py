import tensorflow as tf
tf.enable_eager_execution()
import cv2 as cv
import numpy as np

model = tf.keras.models.load_model("../convolution.h5")

class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

def process(image):
    if image.shape[-1] == 4:
        image = cv.cvtColor(image, cv.COLOR_RGBA2GRAY)
    elif image.shape[-1] == 3:
        image = cv.cvtColor(image, cv.COLOR_RGB2GRAY)
    image = cv.resize(image, (28, 28))
    image = image / 127.5 - 1
    image = np.expand_dims(image, axis=-1)
    image = np.expand_dims(image, axis=0)

    predictions = model.predict(image)[0]

    choice = np.argmax(predictions)
    label = class_names[choice]
    return label
