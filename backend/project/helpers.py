def imagesave(instance,filename):
    extension = filename.split(".")[-1]
    return "users/%s.%s"%(instance.id, extension)