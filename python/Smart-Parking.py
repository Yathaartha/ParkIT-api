import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import sys
import json

data = {}

print("\n\n\t\t**************SMART PARKING USING IMAGE PROCESSING*****************\n\n")

# Storing the image of vacant parking area
img = cv2.imread("./python/EmptySlots.jpg", 1)
plt.figure(figsize=(13, 13))
plt.axis("off")
plt.title("FIGURE: EMPTY PARKING AREA")

# Applying Canny edge Detection to empty Parking Area
img1 = cv2.imread("./python/EmptySlots.jpg", 0)
edges = cv2.Canny(img1, 100, 200)
plt.figure(figsize=(13, 13))
plt.axis("off")

height, width = img1.shape

# Storing the image of Non-Vacant parking area
images = []
for filename in os.listdir("./python/pics"):
    img3 = cv2.imread(os.path.join("./python/pics", filename))
    if img3 is not None:
        images.append(img3)

        plt.figure(figsize=(13, 13))
        plt.axis("off")
        plt.title("FIGURE: NON VACANT PARKING AREA")

        # Applying Canny edge Detection to non-empty Parking Area
        img5 = cv2.resize(img3, (width, height), interpolation=cv2.INTER_AREA)
        edges1 = cv2.Canny(img5, 100, 200)
        plt.figure(figsize=(13, 13))
        plt.axis("off")
        plt.title("FIGURE: APPLYING CANNY EDGE DETECTION TO NON-EMPTY PARKING AREA")

        # Calculating Difference edges
        result_edges = edges1 - edges
        plt.figure(figsize=(13, 13))
        plt.axis("off")
        plt.title("FIGURE: DIFFERENCE EDGES")

        # Calculating slot numbers for lane 1
        start = (56, 70)
        lane1 = []
        while start[0] < 540:
            crop = result_edges[start[1]:start[1] + 60, start[0] + 10:start[0] + 20]
            box = np.array(crop)
            count = np.count_nonzero(crop)
            if count < 35:
                slot = (start[0] - 56) / 29
                lane1.append(int(slot + 1))
            increment = (start[0] + 29, start[1])
            start = increment

        # For Lane 2
        lane2 = []
        start = (56, 139)
        while start[0] < 540:
            crop = result_edges[start[1]:start[1] + 60, start[0] + 10:start[0] + 20]
            box = np.array(crop)
            count = np.count_nonzero(crop)
            if count < 35:
                slot = (start[0] - 56) / 29
                lane2.append(int(slot + 1))
            increment = (start[0] + 29, start[1])
            start = increment

        lane3 = []
        start = (52, 270)
        while start[0] < 540:
            crop = result_edges[start[1]:start[1] + 60, start[0] + 10:start[0] + 20]
            box = np.array(crop)
            count = np.count_nonzero(crop)
            if count < 35:
                slot = (start[0] - 52) / 30
                lane3.append(int(slot + 1))
            increment = (start[0] + 30, start[1])
            start = increment

        # For Lane 4
        lane4 = []
        start = (52, 342)
        while start[0] < 540:
            crop = result_edges[start[1]:start[1] + 60, start[0] + 10:start[0] + 20]
            box = np.array(crop)
            count = np.count_nonzero(crop)
            if count < 35:
                slot = (start[0] - 52) / 30
                lane4.append(int(slot + 1))
            increment = (start[0] + 30, start[1])
            start = increment

        # create a json from all the lanes
        data['lane1'] = lane1
        data['lane2'] = lane2
        data['lane3'] = lane3
        data['lane4'] = lane4

for entry in data:
    print(entry, data[entry])

sys.stdout.flush()