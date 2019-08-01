import tensorflow as tf
tf.enable_eager_execution()
import cv2 as cv
import numpy as np

def init():
    global model
    model = tf.keras.models.load_model("../facenet_keras.h5")


def process(image):
    facecascade = cv.CascadeClassifier("../haarcascade_frontalface_default.xml")
    if image.shape[-1] == 4:
        image = cv.cvtColor(image, cv.COLOR_RGBA2RGB)
    elif len(image.shape) == 2:
        image = cv.cvtColor(image, cv.COLOR_GRAY2RGB)

    SIZE = 640
    h, w = image.shape[:2]
    if w > h:
        w = SIZE * w // h
        h = SIZE
    else:
        h = SIZE * h // w
        w = SIZE
    image = cv.resize(image, (w, h))

    faces = facecascade.detectMultiScale(image)
    if len(faces) == 0:
        return None
    x, y, w, h = faces[0]

    image = image[y:y+h, x:x+w]
    cv.imwrite("face.png", image)

    image = cv.resize(image, (160, 160))
    image = image / 127.5 - 1
    image = np.expand_dims(image, axis=0)

    descriptor = model.predict(image)[0]

    return descriptor
