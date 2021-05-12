import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Input, message, Select} from "antd";
import http from "../../../utils/http";
import utils from "../../../utils/utils";
import store from "../../../store";
import {UPLOAD_PROBLEM_STRUCTURE} from "../../../config";

export default function UploadProblem(props){
    const {route, history, location} = props;
    const state = store.getState();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const exampleLengthLimit = {
        problemName: 100,
        problemTags: 100,
        // problemDiff doesn't need limit
        problemBg: 1000,
        problemDes: 5000,
        timeLimit: 10,
        memoryLimit: 10,
        inputFormat: 1000,
        outputFormat: 1000,
        ioExamples: 1000,
        problemTips: 1000,
        dataRange: 1000,
        dataGenerator: 5000,
        stdProgram: 5000,
    }

    const exampleProblem = {
        problemName: '[NOIP2008 提高组] 传纸条',
        problemTags: '动态规划,dp',
        problemDiff: 'easy',
        problemBg: '每样商品的价格越低，其销量就会相应增大。现已知某种商品的成本及其在若干价位上的销量（产品不会低于成本销售），并假设相邻价位间销量的变化是线性的且在价格高于给定的最高价位后，销量以某固定数值递减。（我们假设价格及销售量都是整数）\n' +
            '\n' +
            '对于某些特殊商品，不可能完全由市场去调节其价格。这时候就需要政府以税收或补贴的方式来控制。（所谓税收或补贴就是对于每个产品收取或给予生产厂家固定金额的货币）',
        problemDes: '小渊和小轩是好朋友也是同班同学，他们在一起总有谈不完的话题。一次素质拓展活动中，班上同学安排做成一个 mm 行 nn 列的矩阵，而小渊和小轩被安排在矩阵对角线的两端，因此，他们就无法直接交谈了。幸运的是，他们可以通过传纸条来进行交流。纸条要经由许多同学传到对方手里，小渊坐在矩阵的左上角，坐标 (1,1)(1,1)，小轩坐在矩阵的右下角，坐标 (m,n)(m,n)。从小渊传到小轩的纸条只可以向下或者向右传递，从小轩传给小渊的纸条只可以向上或者向左传递。\n' +
            '\n' +
            '在活动进行中，小渊希望给小轩传递一张纸条，同时希望小轩给他回复。班里每个同学都可以帮他们传递，但只会帮他们一次，也就是说如果此人在小渊递给小轩纸条的时候帮忙，那么在小轩递给小渊的时候就不会再帮忙。反之亦然。\n' +
            '\n' +
            '还有一件事情需要注意，全班每个同学愿意帮忙的好感度有高有低（注意：小渊和小轩的好心程度没有定义，输入时用 00 表示），可以用一个 [0,100][0,100] 内的自然数来表示，数越大表示越好心。小渊和小轩希望尽可能找好心程度高的同学来帮忙传纸条，即找到来回两条传递路径，使得这两条路径上同学的好心程度之和最大。现在，请你帮助小渊和小轩找到这样的两条路径。',
        timeLimit: 1000,
        memoryLimit: 125.00,
        inputFormat: '第一行有两个用空格隔开的整数 mm 和 nn，表示班里有 mm 行 nn 列。\n' +
            '\n' +
            '接下来的 mm 行是一个 m×n 的矩阵，矩阵中第 ii 行 jj 列的整数表示坐在第 ii 行 jj 列的学生的好心程度。每行的 nn 个整数之间用空格隔开。',
        outputFormat: '输出文件共一行一个整数，表示来回两条路上参与传递纸条的学生的好心程度之和的最大值。',
        ioExamples: '#样例1\n' +
            '3 3\n' +
            '0 3 9\n' +
            '2 8 5\n' +
            '5 7 0\n' +
            '-----\n' +
            '34\n' +
            '\n' +
            '#样例2\n' +
            '3 3\n' +
            '0 3 9\n' +
            '2 8 5\n' +
            '5 7 0\n' +
            '-----\n' +
            '34\n',
        problemTips: '【限制】\n' +
            '\n' +
            '对于 30% 的数据，1≤m,n≤10；\n' +
            '对于 100% 的数据满足：01≤m,n≤50。\n' +
            '\n' +
            '【来源】\n' +
            '\n' +
            'NOIP 2008 提高组第三题',
        dataRange: '对于 30% 的数据，1≤m,n≤10；\n' +
            '对于 100% 的数据满足：01≤m,n≤50。',
        dataGenerator: 'import random\n' +
            'import pprint\n' +
            '\n' +
            'def isLegalTriangle(a, b, c):\n' +
            '    return a+b>c and a+c>b and b+c>a\n' +
            '\n' +
            '\n' +
            '# 数据生成器\n' +
            'def Triangle_TestDataGenerator(INITIAL_RANGE_A, INITIAL_RANGE_B, BITS=2, BATCH_NUM=50):\n' +
            '    """\n' +
            '    :param INITIAL_RANGE_A: 初始边a的生成范围\n' +
            '    :param INITIAL_RANGE_B: 初始边b的生成范围\n' +
            '    :param BITS: 保留小数位数\n' +
            '    :param BATCH_NUM: 期望生成的测试数据组数\n' +
            '    :return: data: 所有测试数据，以列表形式返回\n' +
            '    """\n' +
            '\n' +
            '    data = []\n' +
            '\n' +
            '    for i in range(BATCH_NUM):\n' +
            '        a = 0\n' +
            '        b = 0\n' +
            '        # 确保a, b不为0\n' +
            '        while a == 0 and b == 0:\n' +
            '            a = round(random.uniform(INITIAL_RANGE_A[0], INITIAL_RANGE_A[1]), BITS)\n' +
            '            b = round(random.uniform(INITIAL_RANGE_B[0], INITIAL_RANGE_B[1]), BITS)\n' +
            '\n' +
            '        INITIAL_RANGE_C = (abs(a - b), a + b)\n' +
            '\n' +
            '        c = 0\n' +
            '        while c == 0:\n' +
            '            c = round(random.uniform(INITIAL_RANGE_C[0], INITIAL_RANGE_C[1]), BITS)\n' +
            '\n' +
            '        res = \'\'\n' +
            '        if isLegalTriangle(a, b, c):\n' +
            '            res = \'legal\'\n' +
            '        else:\n' +
            '            res = \'illegal\'\n' +
            '\n' +
            '        # print(\'triangle{}: ({}, {}, {}) is {}\'.format(i, a, b, c, res))\n' +
            '        data.append((a, b, c))\n' +
            '\n' +
            '    return data\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            'if __name__ == \'__main__\':\n' +
            '    # a, b初始值范围\n' +
            '    INITIAL_RANGE_A = (0, 10)\n' +
            '    INITIAL_RANGE_B = (0, 20)\n' +
            '    # 保留小数位数\n' +
            '    BITS = 2\n' +
            '\n' +
            '    data = Triangle_TestDataGenerator(INITIAL_RANGE_A, INITIAL_RANGE_B)\n' +
            '    # pprint.pprint(data)\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n',
        stdProgram: 'import math\n' +
            '\n' +
            'def Triangle_StdProgram(a, b, c, BITS=2):\n' +
            '    """\n' +
            '    :param a:\n' +
            '    :param b:\n' +
            '    :param c:\n' +
            '    :param BITS: 结果保留小数位数\n' +
            '    :return:\n' +
            '    """\n' +
            '\n' +
            '    # 海伦公式\n' +
            '    p = (a + b + c) / 2\n' +
            '\n' +
            '    return round(math.sqrt(p * (p - a) * (p - b) * (p - c)), BITS)\n' +
            '\n' +
            '\n' +
            'if __name__ == \'__main__\':\n' +
            '    temp_triangle = (4.8, 5.2, 6.3)\n' +
            '\n' +
            '    print(Triangle_StdProgram(temp_triangle[0], temp_triangle[1], temp_triangle[2]))\n',


    }

    const [cnt, setCnt] = useState(4);
    const [uploadForm, setUploadForm] = useState(UPLOAD_PROBLEM_STRUCTURE)

    function handleFormFinished(values){
        for(let key in values){
            if(values[key]===undefined){
                values[key] = ''
            }
        }
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        values['uploader'] = userInfo.username;
        console.log('uploadForm:', values);

        let headers = {}
        if(state.logged){
            headers.Authorization = sessionStorage.getItem('token')
        }

        http.post('/upload/problem', utils.makeFormData(values), {
            headers: headers
        }).then(res => {
            console.log('uploadProblem:', res);
            if(res.data.isOk){
                message.success('题目上传成功！').then(() => {
                    scrollTo(0, 0);
                    window.location.reload();
                });

            } else {
                message.error(res.data.errMsg);
            }
        })
        .catch(err => {
            message.error('上传题目失败!');
        })

    }

    function handleFormFinishedFailed(){

    }

    useEffect(() => {
        if(!state.logged){
            setTimeout(() => {
                if(cnt===1){
                    history.push('/login');
                } else{
                    setCnt(cnt-1);
                }
            }, 1000)
        }

    })


    return (
        <div>
            {
                state.logged ? null : (
                    <Alert
                        message={'请先登录后操作! 页面将在'+cnt+'秒后跳转到登录页面'}
                        type='warning'
                        showIcon
                    />
                )
            }
            <div>上传题目</div>
            <div>
                <Form
                    {...layout}
                    name='uploadProblem'
                    initialValues={{remember: true}}
                    onFinish={handleFormFinished}
                    onFinishFailed={handleFormFinishedFailed}
                >
                    <Form.Item
                        label='题目名称'
                        name='problemName'
                        rules={[{required: true}]}
                    >
                        <Input
                            placeholder={'例:' +exampleProblem.problemName}
                            maxLength={exampleLengthLimit.problemName}
                        />
                    </Form.Item>
                    <Form.Item
                        label='题目标签（涉及的算法思想,多个词组用","隔开）'
                        name='problemTags'
                    >
                        <Input
                            placeholder={'例:' +exampleProblem.problemTags}
                            maxLength={exampleLengthLimit.problemTags}
                        />
                    </Form.Item>
                    <Form.Item
                        label='题目难度'
                        name='problemDiff'
                        rules={[{required: true}]}
                    >
                        <Select placeholder='请选择题目难度（入门、简单、中等、困难）'>
                            <Select.Option value='elementary'>入门</Select.Option>
                            <Select.Option value='easy'>简单</Select.Option>
                            <Select.Option value='medium'>中等</Select.Option>
                            <Select.Option value='difficult'>困难</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='题目背景（题目的背景描述,可选）'
                        name='problemBg'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.problemBg}
                            maxLength={exampleLengthLimit.problemBg}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='题目描述（题目的描述）'
                        name='problemDes'
                        rules={[{required: true}]}
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.problemDes}
                            maxLength={exampleLengthLimit.problemDes}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='时间限制（允许的最长运行时间,单位为ms）'
                        name='timeLimit'
                    >
                        <Input
                            placeholder={'例:' +exampleProblem.timeLimit}
                            maxLength={exampleLengthLimit.timeLimit}
                        />
                    </Form.Item>
                    <Form.Item
                        label='空间限制（运行时允许占用的最大空间,单位为MB）'
                        name='memoryLimit'
                    >
                        <Input
                            placeholder={'例:' +exampleProblem.memoryLimit}
                            maxLength={exampleLengthLimit.memoryLimit}
                        />
                    </Form.Item>
                    <Form.Item
                        label='输入格式（对于输入格式的描述）'
                        name='inputFormat'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.inputFormat}
                            maxLength={exampleLengthLimit.inputFormat}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='输出格式（对于输出格式的描述）'
                        name='outputFormat'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.outputFormat}
                            maxLength={exampleLengthLimit.outputFormat}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='输入输出样例'
                        name='ioExamples'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'（1-2个输入输出样例,每个样例以"#样例n"开\\n头,每个输入输出间用"-----"上下隔开）\n'+'例:\n'+exampleProblem.ioExamples}
                            maxLength={exampleLengthLimit.ioExamples}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='题目提示（一些小贴士）'
                        name='problemTips'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.problemTips}
                            maxLength={exampleLengthLimit.problemTips}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='数据范围（题目中所用到数据的范围）'
                        name='dataRange'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.dataRange}
                            maxLength={exampleLengthLimit.dataRange}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='数据生成器（测试数据生成器）'
                        name='dataGenerator'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.dataGenerator}
                            maxLength={exampleLengthLimit.dataGenerator}
                            showCount
                        />
                    </Form.Item>
                    <Form.Item
                        label='标准程序（能够保证输出结果绝对正确的程序）'
                        name='stdProgram'
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder={'例:\n'+exampleProblem.stdProgram}
                            maxLength={exampleLengthLimit.stdProgram}
                            showCount
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 10}}>
                        <Button type='primary' htmlType='submit'>上传题目</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}