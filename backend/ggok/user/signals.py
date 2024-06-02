from django.db.models.signals import post_save
from django.dispatch import receiver
from user.models import UserInfo

@receiver(post_save, sender=UserInfo)
def switch_region(sender, instance, **kwargs):
    # instance.region1이 빈 문자열일 경우에만 실행
    if instance.region1 == "":
        instance.region1 = instance.region2
        instance.region2 = ""
        instance.save(update_fields=["region1", "region2"])