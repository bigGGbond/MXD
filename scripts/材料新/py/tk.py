import openpyxl
import json

def null_if_none(value):
    """将None值转换为null"""
    return value if value is not None else None

def process_excel():
    # 打开Excel文件
    wb = openpyxl.load_workbook(r'C:\Users\李柱柱\Desktop\sc\scripts\材料新\excel\头盔.xlsx')
    ws = wb['Sheet1']

    # 初始化数据结构
    data = {}

    # 遍历每一行
    for row_idx, row in enumerate(ws.iter_rows(values_only=True)):
        if row_idx == 0:  # 跳过表头
            continue

        # 获取基本数据
        helmet_id = str(row[0])      # 头盔ID
        level = int(row[1])          # 等级
        atk_mag = row[2]             # 攻/魔
        def_mag_def = row[3]         # 防/魔防

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

        gold = row[10] or 0               # 金币

        # 如果是新的头盔ID，初始化数据结构
        if helmet_id not in data:
            data[helmet_id] = {}

        # 构造等级数据
        level_data = {
            "攻/魔": atk_mag,
            "防/魔防": def_mag_def,
            "材料": [
                [boss_material['id'], boss_material['qty']],
                [material1['id'], material1['qty']],
                [0, gold]
            ],
            "绑定材料": [
                boss_material['bind'],
                material1['bind']
            ]
        }

        # 添加到数据结构
        data[helmet_id][f"等级{level}"] = level_data

    return data

def save_json(data, filename='头盔进阶数据.json'):
    """保存为JSON文件"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def main():
    try:
        print("开始处理Excel数据...")
        data = process_excel()
        print("数据处理完成，正在保存...")
        save_json(data)
        print("文件保存成功！")
    except Exception as e:
        print(f"发生错误: {str(e)}")

if __name__ == "__main__":
    main()
