import openpyxl
import json

# 设置编码
import sys
sys.stdout.reconfigure(encoding='utf-8')

def null_if_none(value):
    """将None值转换为null"""
    return value if value is not None else None

def process_excel():
    # 打开Excel文件
    wb = openpyxl.load_workbook(r'C:\Users\李柱柱\Desktop\sc\scripts\材料新\excel\坐骑.xlsx')
    ws = wb['Sheet1']

    # 初始化数据结构
    data = {}
    current_mount_id = None

    # 遍历每一行
    for row_idx, row in enumerate(ws.iter_rows(values_only=True)):
        if row_idx == 0:  # 跳过表头
            continue
            
        # 跳过空行
        if not row[0]:
            continue

        try:
            # 获取基本数据
            mount_id = str(row[0])        # 坐骑ID
            # 确保等级是有效的数字
            if row[1] is None:
                print(f"警告：第{row_idx + 1}行的等级为空，跳过该行")
                continue
            level = int(row[1])          # 等级
            hp_mp = row[2]               # HP/MP
            atk_mag = row[3]             # 攻/魔

            # 材料数据
            boss_material = {
                'id': null_if_none(row[4]),    # BOSS材料
                'bind': null_if_none(row[5]),  # BOSS绑定
                'qty': row[6] or 0             # BOSS数量
            }

            material1 = {
                'id': null_if_none(row[7]),    # 材料1
                'bind': null_if_none(row[8]),  # 材料1绑定
                'qty': row[9] or 0             # 材料1数量
            }

            material2 = {
                'id': null_if_none(row[10]),   # 材料2
                'bind': null_if_none(row[11]), # 材料2绑定
                'qty': row[12] or 0            # 材料2数量
            }

            gold = row[13] or 0               # 金币

            # 如果是新的坐骑ID，初始化数据结构
            if mount_id not in data:
                data[mount_id] = {}

            # 构造等级数据
            level_data = {
                "四维": hp_mp,
                "双攻": atk_mag,
                "材料": [
                    [boss_material['id'], boss_material['qty']],
                    [material1['id'], material1['qty']],
                    [material2['id'], material2['qty']],
                    [0, gold]
                ],
                "绑定材料": [
                    boss_material['bind'],
                    material1['bind'],
                    material2['bind']
                ]
            }

            # 添加到数据结构
            data[mount_id][f"等级{level}"] = level_data

        except Exception as e:
            print(f"处理第{row_idx + 1}行时出错：{str(e)}")
            continue

    return data

def save_json(data, filename='坐骑进阶数据.json'):
    """保存为JSON文件"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def main():
    try:
        print("开始处理Excel数据...")
        data = process_excel()
        if not data:
            print("警告：没有处理到任何有效数据")
            return
        print("数据处理完成，正在保存...")
        save_json(data)
        print("文件保存成功！")
    except Exception as e:
        print(f"发生错误: {str(e)}")

if __name__ == "__main__":
    main()