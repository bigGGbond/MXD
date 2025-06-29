import openpyxl
import json

def null_if_none(value):
    """将None值转换为null"""
    return value if value is not None else None

def process_excel():
    # 打开Excel文件
    wb = openpyxl.load_workbook(r'C:\Users\李柱柱\Desktop\sc\scripts\材料新\excel\武器.xlsx')
    ws = wb['Sheet1']

    # 初始化数据结构
    data = {}
    current_weapon_id = None

    # 遍历每一行
    for row_idx, row in enumerate(ws.iter_rows(values_only=True)):
        if row_idx == 0:  # 跳过表头
            continue

        # 获取基本数据
        weapon_id = str(row[0])        # 武器ID
        level = int(row[1])          # 等级
        atk_mag = row[2] or 0        # 攻/魔
        accuracy = row[3] or 0       # 命中率

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

        # 如果是新的武器ID，初始化数据结构
        if weapon_id not in data:
            data[weapon_id] = {}

        # 构造等级数据
        level_data = {
            "攻/魔": atk_mag,
            "命中率": accuracy,
            "材料": [
                [boss_material['id'] if boss_material['id'] else None, boss_material['qty']],
                [material1['id'] if material1['id'] else None, material1['qty']],
                [material2['id'] if material2['id'] else None, material2['qty']],
                [0, gold]
            ],
            "绑定材料": [
                boss_material['bind'],
                material1['bind'],
                material2['bind']
            ]
        }

        # 添加到数据结构
        data[weapon_id][f"等级{level}"] = level_data

    return data

def save_json(data, filename=r'C:\Users\李柱柱\Desktop\sc\scripts\材料新\json\武器奖励数据.json'):
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