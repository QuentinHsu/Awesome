# Print a string with custom color and delay
# 打印带有自定义颜色和延迟的字符串
# Parameters:
#   $1: The string to be printed
#       要打印的字符串
#   $2: Font color code (0-255)
#       字体颜色代码（0-255）
#   $3: Delay time (optional, default is 0.1 seconds)
#       延迟时间（可选，默认为0.1秒）
function print_with_color_and_delay() {
  local string=$1
  local color=$2
  local delay=${3:-0.1}  # Default delay time is 0.1 seconds
  # 设置字体颜色
  echo -ne "\033[38;5;${color}m"
  for ((i=0; i<${#string}; i++)); do
    echo -n "${string:$i:1}"
    sleep $delay
  done
  # Reset font color to default
  # 重置字体颜色为默认颜色
  echo -ne "\033[0m"
  echo
}
# Call the function and print a sentence with custom color
# 调用函数并打印带自定义颜色的句子
print_with_color_and_delay "Code is my life." 196  # Use color code 196 (red)
# You can adjust the delay time by passing a third argument
# 可以通过传递第三个参数来调整延迟时间
print_with_color_and_delay "Code is my life." 33 0.2  # Use color code 33 (yellow), delay time is 0.2 seconds

print_with_color_and_delay "Code is my life." 108 0.01
print_with_color_and_delay "Coding is a passion, writing until the world is filled with love!" 108 0.01