def calculator():
    print("欢迎使用简单计算器！")
    print("支持的操作：")
    print("+ : 加法")
    print("- : 减法")
    print("* : 乘法")
    print("/ : 除法")
    print("输入 'quit' 退出程序")
    
    while True:
        # 获取用户输入
        expression = input("\n请输入表达式 (例如: 2 + 3): ")
        
        # 检查是否退出
        if expression.lower() == 'quit':
            print("感谢使用计算器，再见！")
            break
        
        try:
            # 分割输入
            parts = expression.split()

            # 检查输入格式
            if len(parts) != 3:
                print("错误：请输入格式如 '数字 运算符 数字' 的表达式")
                continue

            # 提取数字和运算符
            num1 = float(parts[0])
            operator = parts[1]
            num2 = float(parts[2])

            # 执行计算
            if operator == '+':
                result = num1 + num2
            elif operator == '-':
                result = num1 - num2
            elif operator == '*':
                result = num1 * num2
            elif operator == '/':
                if num2 == 0:
                    print("错误：除数不能为零")
                    continue
                result = num1 / num2
            else:
                print(f"错误：不支持的运算符 '{operator}'")
                continue

            # 显示结果
            print(f"结果: {result}")

        except ValueError:
            print("错误：请输入有效的数字")
        except Exception as e:
            print(f"发生错误: {e}")

# 运行计算器
if __name__ == "__main__":
    calculator()