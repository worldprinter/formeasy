export function getWords(input: string): string[] {
    // 使用正则表达式匹配所有字母组成的单词
    const words = input.match(/[a-zA-Z]+/g)

    if (words) {
        return words
    } else {
        return []
    }
}
