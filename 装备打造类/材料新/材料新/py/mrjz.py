import openpyxl
import json

def null_if_none(value):
    """将None值转换为null"""
    return value if value is not None else None

def create_level_zero_data():
    """创建等级0的初始数据"""
    return {
        "HP": 0,
        "MP": 0,
        "四维": 0,
        "攻魔": 0,
        "双防": 0,
        "可强化次数": 0,
        "可使用金锤子次数": 0,
        "材料": [
            [null_if_none(None), 0],
            [null_if_none(None), 0],
            [null_if_none(None), 0],
            [0, 0]
        ],
        "绑定材料": [
            null_if_none(None),
            null_if_none(None),
            null_if_none(None)
        ]
    }

def process_excel():
    # 打开Excel文件
    wb = openpyxl.load_workbook(r'C:\Users\李柱柱\Desktop\sc\新建文件夹\材料新\材料新\excel\每日戒指.xlsx')
    ws = wb['Sheet1']

    # 初始化数据结构
    data = {}

    # 遍历每一行
    for row_idx, row in enumerate(ws.iter_rows(values_only=True)):
        if row_idx == 0:  # 跳过表头
            continue
        if row[0] is None or row[1] is None or str(row[1]).strip() == "":
            continue  # 跳过无效行

        # 获取基本数据
        ring_id = str(row[0])        # 戒指ID
        level = int(row[1])          # 等级
        hp = int(row[2] or 0)        # HP
        mp = int(row[3] or 0)        # MP
        stat = int(row[4] or 0)      # 力敏运智
        atk_mag = int(row[5] or 0)   # 攻/魔
        def_mag = int(row[6] or 0)   # 防/魔防
        enhance_count = int(row[7] or 0)  # 可强化次数
        hammer_count = int(row[8] or 0)   # 可使用金锤子次数

        # 材料数据
        mat1_bind = null_if_none(row[9])
        mat1_unbind = null_if_none(row[10])
        mat1_qty = int(row[11] or 0)

        mat2_bind = null_if_none(row[12])
        mat2_unbind = null_if_none(row[13])
        mat2_qty = int(row[14] or 0)

        mat3_bind = null_if_none(row[15])
        mat3_unbind = null_if_none(row[16])
        mat3_qty = int(row[17] or 0)

        gold = int(row[18] or 0)     # 金币

        # 如果是新的戒指ID，初始化数据结构并添加等级0数据
        if ring_id not in data:
            data[ring_id] = {
                "等级0": create_level_zero_data()
            }

        # 构造等级数据
        level_data = {
            "HP": hp,
            "MP": mp,
            "四维": stat,
            "攻魔": atk_mag,
            "双防": def_mag,
            "可强化次数": enhance_count,
            "可使用金锤子次数": hammer_count,
            "材料": [
                [mat1_bind, mat1_qty],
                [mat2_bind, mat2_qty],
                [mat3_bind, mat3_qty],
                [0, gold]
            ],
            "绑定材料": [
                mat1_unbind,
                mat2_unbind,
                mat3_unbind
            ]
        }

        # 添加到数据结构
        data[ring_id][f"等级{level}"] = level_data

    return data

def save_json(data, filename='每日戒指进阶数据.json'):
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
