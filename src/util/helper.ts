//编码
export function btoa(str:string):string{
    return window.btoa(window.encodeURIComponent(str))
}
//解码
export function atob(str:string):string{
    return window.decodeURIComponent(window.atob(str))
}
