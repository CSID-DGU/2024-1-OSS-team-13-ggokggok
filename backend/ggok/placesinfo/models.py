from django.db import models

class PlaceInfo(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    lat = models.FloatField()
    long = models.FloatField()
    category = models.CharField(max_length=100)
    objects = models.Manager()
    total_review_score = models.IntegerField(default=0)
    review_count = models.IntegerField(default=0)
    average_review = models.FloatField(default=0.0)

    def update_average_review(self):
        if self.review_count > 0:
            self.average_review = self.total_review_score / self.review_count
        else:
            self.average_review = 0.0
        self.save()
    def __str__(self):
        return self.name

