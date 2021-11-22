export const DEFAULT_PROBLEM_LIST_PAGESIZE = 10;
export const DEFAULT_CONTEST_LIST_PAGESIZE = 10;

export const UPLOAD_PROBLEM_STRUCTURE = {
    problemId: '',
    uploader: '',
    problemName: '',
    problemTags: '',
    problemDiff: '',
    problemBg: '',
    problemDes: '',
    timeLimit: 0,
    memoryLimit: 0,
    inputFormat: '',
    outputFormat: '',
    ioExamples: '',
    problemTips: '',
    dataRange: '',
    stdInput: '',
    stdOutput: ''
}

export const UPLOAD_PROBLEM_TEST_STRUCTURE = {
    problemId: 'problemId',
    uploader: 'uploader',
    problemName: 'problemName',
    problemTags: 'problemTags',
    problemDiff: 'problemDiff',
    problemBg: 'problemBg',
    problemDes: 'problemDes',
    timeLimit: 0,
    memoryLimit: 0,
    inputFormat: 'inputFormat',
    outputFormat: 'outputFormat',
    ioExamples: 'ioExamples',
    problemTips: 'problemTips',
    dataRange: 'dataRange',
    stdInput: 'stdInput',
    stdOutput: 'stdOutput'
}

export const LENGTH_LIMIT = {
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