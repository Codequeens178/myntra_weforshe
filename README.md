# myntra_weforshe

Trend prediction from Social Media:
This project aims to predict future fashion trends by analyzing Instagram posts. It uses a mix of machine learning techniques, image processing, and sentiment analysis to group similar fashion styles and assess public sentiment towards them.

1.Data Collection: Data is gathered from Instagram posts using the Apify platform. The data includes the post's image, the number of likes and comments, and a sample of 20 comments per post.

2.Image Segmentation: The images from the posts are processed using YOLO and SAM to isolate the clothes from the background. The result is a collection of segmented images where only the clothes are visible against a black background.

3.Feature Extraction and Dimensionality Reduction: The segmented images are then passed through an autoencoder to extract a compact representation (latent space) of the clothing items. PCA is further applied to reduce the dimensionality of the latent space.

4.Clustering: The PCA-transformed latent spaces are then clustered using the K-Means algorithm. Each cluster represents a distinct fashion style.

5.Sentiment Analysis: The comments associated with each post are analyzed using the AdaBoost algorithm to gauge public sentiment towards the fashion styles represented in the posts.

The repository contains several directories:

data: This directory contains all the datasets, including the raw and cleaned versions.

models: This directory contains the machine learning models' weights, excluding the large SAM model which is not included in the repo due to its size.

research: This directory contains two Jupyter notebooks that were used to decide the number of clusters and train the autoencoder.

images: This directory contains two subdirectories - "original_images" and "segmented_images" which hold the original and segmented images respectively.

python scripts: These are a series of Python files responsible for different steps in the pipeline. 

The order of execution is as follows:
data_preprocessing.py
download_images.py
image_segmentation.py
latent_space_creator.py
latent_space_clustering.py

To use the project, run the python scripts in the order specified above.

Tech stack used:
Python: The project is implemented in Python, a powerful and versatile programming language that is widely used in data science and machine learning.
YOLO & SAM: These algorithms are used for image segmentation.
PCA & KMeans: These techniques are used for dimensionality reduction and clustering.
AdaBoost: This machine learning algorithm is used for sentiment analysis.

