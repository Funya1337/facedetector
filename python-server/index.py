import tensorflow as tf
model = tf.keras.models.load_model("convolution.h5")

model.predict(img)[0]