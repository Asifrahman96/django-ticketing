from django.utils.text import slugify
import random, string

def random_string_generator(size=10, chars = string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_booking_id_generator(instance):
    new_booking_id = random_string_generator()

    klass = instance.__class__
    qs_exists = klass.objects.filter(booking_id = new_booking_id).exists()
    if qs_exists:
        return unique_booking_id_generator(instance)
    return new_booking_id


    