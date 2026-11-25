---
title: "第二次作业复盘"
pubDatetime: 2026-11-24T21:30:00+08:00
description: "总结反思"
tags: ["C++", "学习笔记","作业反思","指针"]
draft: false
---
## 前言
面对稍微长一点，要分别考虑多种情况的代码就静不下心了想求助ai（一半是oj上计时功能害的），以后可以主动练些长代码，提高严谨度和速度

## 任务描述
把原数组中的负数和非负数分别放入两个新数组，各组内保持原输入顺序。0 属于非负数。
请实现 splitBySign。主程序先声明两个值为 NULL 的 int * 指针，再把这两个指针变量的地址传给函数。函数按两组各自的元素个数用 new[] 分配新数组，通过 int ** 参数把新数组首地址写回主程序，并用引用参数带回长度。没有元素的组返回 NULL、长度为0。
原数组保持不变。主程序输出两个结果数组后，分别用 delete[] 释放它们。

## 我的思路
一开始觉得很绕，后来大概理了一下有什么数据，各自是什么类型，便清楚一些，给两个新数组分配元素也很简单，于是开始写

## 原始代码

```cpp
#include <iostream>
#include<cstddef>
using namespace std;

void splitBySign(const int *a, int n, int **negative, int &negativeCount,
int **nonnegative, int &nonnegativeCount);

int main(){
    int n;
    cin>>n;
    int a[n];
    cin>>a;//标准输入流没有“读入整个 int 数组”的重载。必须循环读，但对char a[20]是可以的
           //因为标准库有读入 C 字符串的 operator>>(char *) 重载 
    int negC=0;
    int nonnegC=0;
    int& negC_=negC;
    int& nonnegC_=nonnegC;
    int* negative=NULL;
    int* nonnegative=NULL;
    int** p1=&negative;
    int** p2=&nonnegative;
    splitBySign(a,n,p1,negC_,p2,nonnegC)
    cout<<negC<<' '<<nonnegC<<endl;
    cout<<negative<<endl;
    cout<<nonnegative<<endl;//同样地没有输出int数组的重载，此处循环输出，再加上指针为NULL时打印EMPTY。
    delete[] *p1;
    delete[] *p2;

    return 0;
}

void splitBySign(const int *a, int n, int **negative, int &negativeCount,
int **nonnegative, int &nonnegativeCount){
//开头最好重新初始化两个引用为0
    for(int i=0;i<n;i++){
        if(a[i]<0) negC_++;
        else nonnegC_++;
    }
    new int nega[negC_];      //*negative=new interesting[negC]
    new int nonnega[nonnegC_];//应该是直接new出一片空间不用新建数组，然后用negative指向它，且要用if语句去考虑negC为0的情况
    int k1=0;
    int k2=0;
    for(int i=0;i<n;i++){
        if(a[i]<0){
            nega[k1]=a[i];
            k1++;
        }
        else{
            nonnega[k2]=a[i];
            k2++;
        }
    }
    *p1=nega;//这里是**p，因为要negative指向两个
    *p2=nonnega;

    return;
}
```

## 结构问题
main()：引入p1,p2是没有必要的，还是二级指针容易把自己绕晕，直接把 &(non)negtive 传入函数就行，然后也不用专门建negC_来引用neg，直接将neg传入
函数，编译器会自动让形参 negativeCount 成为实参 negC 的别名，我这样反而多此一举。

##最终代码
```cpp
#include <iostream>
#include <cstddef>
using namespace std;

void splitBySign(const int *a, int n, int **negative, int &negativeCount,
                 int **nonnegative, int &nonnegativeCount);

int main() {
    int n;
    cin >> n;

    int a[100];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int *negative = NULL;
    int *nonnegative = NULL;
    int negativeCount = 0;
    int nonnegativeCount = 0;

    splitBySign(a, n, &negative, negativeCount, &nonnegative, nonnegativeCount);

    cout << negativeCount << ' ' << nonnegativeCount << endl;

    if (negativeCount == 0) {
        cout << "EMPTY" << endl;
    } else {
        for (int i = 0; i < negativeCount; i++) {
            if (i > 0) cout << ' ';
            cout << negative[i];
        }
        cout << endl;
    }

    if (nonnegativeCount == 0) {
        cout << "EMPTY" << endl;
    } else {
        for (int i = 0; i < nonnegativeCount; i++) {
            if (i > 0) cout << ' ';
            cout << nonnegative[i];
        }
        cout << endl;
    }

    delete[] negative;
    delete[] nonnegative;

    return 0;
}

void splitBySign(const int *a, int n, int **negative, int &negativeCount,
                 int **nonnegative, int &nonnegativeCount) {
    negativeCount = 0;
    nonnegativeCount = 0;

    for (int i = 0; i < n; i++) {
        if (a[i] < 0) {
            negativeCount++;
        } else {
            nonnegativeCount++;
        }
    }

    if (negativeCount > 0) {
        *negative = new int[negativeCount];
    } else {
        *negative = NULL;
    }

    if (nonnegativeCount > 0) {
        *nonnegative = new int[nonnegativeCount];
    } else {
        *nonnegative = NULL;
    }

    int negIndex = 0;
    int nonnegIndex = 0;

    for (int i = 0; i < n; i++) {
        if (a[i] < 0) {
            (*negative)[negIndex] = a[i];
            negIndex++;
        } else {
            (*nonnegative)[nonnegIndex] = a[i];
            nonnegIndex++;
        }
    }
}
```

## 总结
整道题的思路就是创建两个空指针，把空指针的地址传入函数，函数通过改这个地址存的地址让这个指针指向新建的数组，negative（main函数里的）那块内存存的是新分配的内存的那块地址。
还是细节问题居多，有些是没记住有些是忘记了，然后没有完全get到题目到底要我怎么做，说明我基本的思想没有完全消化理解，希望这次能
让我对指针的掌握跟进一步。
