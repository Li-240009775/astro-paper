---
title: "代码优化思考"
pubDatetime: 2026-11-25T21:51:00+08:00
description: "总结反思"
tags: ["C++", "学习笔记","作业反思","指针","优化"]
draft: false
---
## 前言
之前写代码一直觉得过了就行（做到这一点已经力竭了），但想想养成良好的编程习惯对我的速度严谨性和以后都有帮助，也能改善我的编程
思想，所以自己代码能过但写的很shit的地方一定要揪出来改正。

## 一道简单指针题-原代码
```cpp
//将矩阵各行下移k行
#include<iostream>
using namespace std;

void rotateRowsDown(int (*a)[4], int rows, int k);
int main(){
    int rows,k;
    cin>>rows>>k;
    int (*a)[4] = new int[rows][4];//这里的声明值得思考一下，写在后面总结
    for(int i=0;i<rows;i++){
        for(int j=0;j<4;j++){
            cin>>a[i][j];
        }
    }
    rotateRowsDown(a,rows,k);
    for(int i=0;i<rows;i++){
        for(int j=0;j<4;j++){
            cout<<a[i][j];
            if(j!=3) cout<<' ';
        }
        cout<<endl;
    }
    delete[] a;
    return 0;
}

void rotateRowsDown(int (*a)[4], int rows, int k){
    //k %= rows;先把大k化小防止每次循环对大k取模。
    //if (k == 0) return;特殊情况直接return。
    int (*b)[4] = new int[rows][4];//最后不要在函数里new，直接在申请栈上临时数组减少每次分配释放的开销
     for(int i=0;i<rows;i++){
        for(int j=0;j<4;j++){
           b[i][j]=a[i][j];
        }
    }
    for(int i=0;i<rows;i++){
        for(int j=0;j<4;j++){
           a[(i+k)%rows][j]=b[i][j];
        }
    }

    delete[] b;
    return;
}
```

## 总结
好像写下来值得优化的不多，但值得记录，不过这次记录其实最有价值的是发现了一个混淆，要不是写了这篇我就
跳过去了，对于 int (*a)[4] = new int[rows][4] 我一开始觉得a就是数组本身，所以也可以写int a[rows][4]=new int[rows][4]，
我这里是混淆了数组名退化成指针和数组名就是指针，int a[rows][4] 声明的是一个二维数组变量。而new int[rows][4] **分配的是 rows 个含 4 个 int 的数组**，即 rows 个 int[4] 对象。**它返回指向第一个 int[4] 的指针**，第二种写法完全是错的，要按第一种申明一个指向int [4]数组类型的指针，而它和二维数组退化的指针是一样的，数组名退化后也是 int (*)[4] 类型，同时a[i][j]的写法对这个指针a也适用（这也是让我混淆的原因之一）。
现在发现很多之前的知识细节被我忘了或者记错记混了（后者是更严重的），这也许是前面学习一直没做笔记没反思过导致的，正是这些降低了我的速度和正确率。

## 补充
1. “数组名退化”是有条件的
数组名在大多数表达式里退化为指向首元素的指针，但并非所有场景：

```cpp
int b[3][4];

sizeof(b);    // 3*4*sizeof(int)，不退化
&b;           // 类型 int (*)[3][4]，指向整个二维数组，不退化
```
而指针变量 a 没有“退化”这回事，它始终是指针。所以两者虽然很多时候类型相同，但本质不同：

a 可赋值、可 delete[]；

b 不能赋值，生命周期由作用域决定。