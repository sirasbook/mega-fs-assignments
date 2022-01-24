def solve(wordList, target):
    print("word_list: ", wordList)
    print("target: ", target)

    for i in range(1, len(target)):
        found = True
        dict = {}
        dict[target[:i]] = dict.get(target[:i], 0) + 1
        dict[target[i:]] = dict.get(target[i:], 0) + 1
        for key in dict:
            if key not in wordList:
                found = False
            else:
                if wordList.count(key) != dict[key]:
                    found = False

        if found == True:
            print(f'("{target[:i]}", "{target[i:]}")\n')
            return
    
    print("None\n")
    return

word_list = ["ab", "bc", "cd"]
target = "abcd"
solve(word_list, target)

word_list = ["ab", "bc", "cd"]
target = "cdab"
solve(word_list, target)

word_list = ["ab", "bc", "cd"]
target = "abab"
solve(word_list, target)