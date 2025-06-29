import openpyxl
import json

def null_if_none(value):
    """将None值转换为null"""
    return value if value is not None else None

def process_excel():
    # 打开Excel文件
    wb = openpyxl.load_workbook(r'C:\Users\Admin\Desktop\sc\scripts\材料新\excel\戒指3.xlsx')
    ws = wb['Sheet1']

    # 初始化数据结构
    data = {}
    current_ring_id = None

    # 遍历每一行
    for row_idx, row in enumerate(ws.iter_rows(values_only=True)):
        if row_idx == 0:  # 跳过表头
            continue

        # 获取基本数据
        ring_id = str(row[0])        # 戒指ID
        level = int(row[1])          # 等级
        hp_mp = row[2]              # HP/MP (四维)
        atk_mag = row[3]            # 攻/魔 (双攻)
        accuracy = row[4]           # 命中率
        avoid = row[5]              # 回避率

        # 材料数据
        boss_material = {
            'id': null_if_none(row[6]),    # BOSS材料
            'bind': null_if_none(row[7]),  # BOSS绑定
            'qty': row[8] or 0             # BOSS数量
        }

        material1 = {
            'id': null_if_none(row[9]),    # 材料1
            'bind': null_if_none(row[10]), # 材料1绑定
            'qty': row[11] or 0            # 材料1数量
        }

        material2 = {
            'id': null_if_none(row[12]),   # 材料2
            'bind': null_if_none(row[13]), # 材料2绑定
            'qty': row[14] or 0            # 材料2数量
        }

        gold = row[15] or 0               # 金币

        # 如果是新的戒指ID，初始化数据结构
        if ring_id not in data:
            data[ring_id] = {}

        # 构造等级数据
        level_data = {
            "四维": hp_mp,
            "双攻": atk_mag,
            "命中": accuracy,
            "回避": avoid,
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
        data[ring_id][f"等级{level}"] = level_data

    return data

def save_json(data, filename='戒指3进阶数据.json'):
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
