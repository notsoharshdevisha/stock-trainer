import yfinance as yf 
import matplotlib.pyplot as plt
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

data = yf.download("tsla")

close = data.Close.to_list()

def transform_data(window, close):
    init_index = 0
    x = list()
    y = list()
    while init_index+window+1 <= len(close)-1:
        x.append(close[init_index: init_index+window])
        y.append(close[init_index+window+1])
        init_index += 1
    return x, y

scaler = MinMaxScaler(feature_range=(0, 1))
x, y = transform_data(100, close)
x = scaler.fit_transform(x)
y = scaler.fit_transform(np.array(y).reshape(-1,1))

print(x) 
print(y) 
print(x.shape[0], x.shape[1])

indices = np.arange(len(x))

x_train, x_test = train_test_split(x, test_size=0.3, shuffle=False)
y_train, y_test = train_test_split(y, test_size=0.3, shuffle=False)
train_indices, test_indices = train_test_split(indices, test_size=0.3)


x_train = x_train.reshape(x_train.shape[0], x_train.shape[1], 1)
x_test = x_test.reshape(x_test.shape[0], x_test.shape[1], 1)

print(x_train.shape[0], x_train.shape[1], x_train.shape[2])

model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(100,1)))
model.add(LSTM(50, return_sequences=True))
model.add(LSTM(50))
model.add(Dense(1))
model.compile(loss="mean_squared_error", optimizer="adam")
print(model.summary())
model.fit(x_train, y_train, validation_data=(x_test, y_test), epochs=10, batch_size=64, verbose=1)
y_pred = model.predict(x_test)

print(mean_absolute_error(scaler.inverse_transform(y_pred), scaler.inverse_transform(y_test)))
