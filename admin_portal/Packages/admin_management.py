import os
import pandas as pd
import glob
import time
import shutil
import datetime as dt

today = dt.datetime.now().date()


def deleteFiles(folder_paths, n):
    keepDates = [today]
    for i in range(1, n):
        keepDates.append(today - dt.timedelta(days=i))
    for path_file_ in folder_paths:
        for folder in os.listdir(path_file_):
            innerPath = os.path.join(path_file_, folder)
            folderTime = dt.datetime.fromtimestamp(os.path.getctime(innerPath))
            if folderTime.date() not in keepDates:
                os.system('sudo rm -rf "' + innerPath + '"')


def get_storage_(path):
    total, used, free = shutil.disk_usage(path)
    print(f'''    
        TOTAL DISK SPACE : {round(total / (1024.0 ** 3), 4)} GiB
        USED DISK SPACE  : {round(used / (1024.0 ** 3), 4)} GiB
        FREE DISK SPACE  : {round(free / (1024.0 ** 3), 4)} GiB
    ''')
    final_total_ = round(total / (1024.0 ** 3), 4)
    final_used_ = round(used / (1024.0 ** 3), 4)
    final_free_ = round(free / (1024.0 ** 3), 4)
    return final_total_, final_used_, final_free_
