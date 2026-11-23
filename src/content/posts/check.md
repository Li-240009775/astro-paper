--- 
title: "作业复盘"
pubDatetime: 2026-11-23T22:28:00+08:00
description: "复盘"
tags: ["C++", "学习笔记"]
draft: false
---
### 前言   
写作业时大多时间浪费在一些细节上，现在写码的思路逐渐清晰，但平常的练习太少了，并且改完错也没有总结复盘，下次还犯，这次就拿一道
简单指针题分析。

### 原代码改错
```cpp
#include <iostream>
using namespace std;
int length(char a[]){
    int num=0;
    while(a[num]!='\0'){       
        num++;
    }
    return num;
}

void sortWords( char *order[], int n);//此处按题目要求应用const
int main(){
    char words[30][21];
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        cin>>words[i];        
    }
     char *order[30];//const同样不该删
    for(int i=0;i<n;i++){
        *order[i]=words[i];//写到这里我删掉了之前的const，但是仔细一想const char *order[]是让order里指针指向的那个数组不能
    }                      //修改但是指针本身即谁指向的哪个数组是可以改的，如果是char *const order[]就反过来。
                           //并且这里应该是order[i]=words[i];因为指针赋值语句就是直接(指针=指针指向的数据类型)。      
    sortWords(order[],n);//order[]很奇怪，我要传的就是order这个以指针为元素的数组，既然理解了这一点直接写order就行
    for(int i=0;i<n;i++){
        cout<<*order[i]<<' ';//直接order，给cout数组名（首元素指针）它就能打印整个数组。
    }
    cout<<endl;
    for(int i=0;i<n;i++){    //这样最后一个单词末也带空格，容易因为格式不对WA，用if(i<(n-1)) cout<<' ';
        cout<<words[i]<<' ';                                               //cout<<words[i];   
    }
    return 0;
}
void sortWords( char *order[], int n){
    for(int i=0;i<n;i++){
        for(int j=i;j<n;j++){
            if(!(length(*order[i])<length(order[j]))){//length接受order元素指向的数组的首地址(这里是写的时候顺手注释)
                char *tem;
                tem=order[i];
                order[i]=order[j];
                order[j]=tem;
            }
            else if(length(*order[i]/*神奇手滑*/)=length(order[j])){
                if((int)**order[i]>(int)**order[j]){//这里只比较了首字母，要引入<cstring>使用strcmp。
                    char *tem;
                tem=order[i];
                order[i]=order[j];
                order[j]=tem;
                }
            }
        }
    }
}
```   
### 结构修改
sortWords可以这样优化，先bool needSwap=false,再写两个if分别对应两种情况，满足条件就needSwap=true，最后只要写一遍swap的代码，并且逻辑更清晰。
若不用strcmp，可以这样写
```cpp
int myStrcmp(const char *a, const char *b){
    int i = 0;
    while(a[i] != '\0' && b[i] != '\0'){
        if(a[i] != b[i]) return a[i] - b[i];
        i++;
    }
    return a[i] - b[i];   // 处理长度不同（本题同长时这里返回 0）
}
```

### 总结
我写的时候知道order是元素为指向words每个单词数组的数组，即order的类型是char**，但具体落到代码上
一些细节就没有感觉，按错误的直觉走，写的时候难以自己通过思考发现错误，知道那里错了才能想出来为什么
错了，同时速度也太慢了。所以要多加练习。接下来我应该每天保持训练量并做好复盘。