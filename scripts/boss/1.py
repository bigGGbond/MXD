import openpyxl
import json

# 加载 Excel 文件
wb = openpyxl.load_workbook(r'C:\Users\李柱柱\Desktop\scripts\boss\boss数据1.xlsx')
ws = wb.active

result = {"个人": []}  # 顶层结构

for row in ws.iter_rows(min_row=2, values_only=True):
    try:
        # 判断是否为有效数据行（检测黄金枫叶材料ID是否为整数）
        int(row[4])
    except (ValueError, TypeError):
        continue

    try:
        material_list = []

        # 黄金枫叶
        material_list.append([int(row[4]), round(float(row[5]), 2)])

        # 衣服材料
        material_list.append([int(row[6]), round(float(row[7]), 2)])
        material_list.append([int(row[8]), round(float(row[9]), 2)])

        # 武器材料
        material_list.append([int(row[10]), round(float(row[11]), 2)])
        material_list.append([int(row[12]), round(float(row[13]), 2)])

        # 手套材料
        material_list.append([int(row[14]), round(float(row[15]), 2)])
        material_list.append([int(row[16]), round(float(row[17]), 2)])

        # 鞋子材料
        material_list.append([int(row[18]), round(float(row[19]), 2)])
        material_list.append([int(row[20]), round(float(row[21]), 2)])

        # 金币（材料ID为 0）
        material_list.append([0, round(float(row[22]), 2)])

        result["个人"].append(material_list)

    except Exception as e:
        print(f"处理行出错：{row}，错误信息：{e}")

# 输出 JSON 到文件
with open('boss奖励_个人格式.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

# 控制台输出
print(json.dumps(result, ensure_ascii=False, indent=2))
