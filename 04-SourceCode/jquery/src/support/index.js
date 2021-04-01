
export default function support ( support ) {
    var input = document.createElement("input"),
        fragment = document.createDocumentFragment(),
        div = document.createElement("div"),
        select = document.createElement("select"),
        opt = select.appendChild( document.createElement("option") );

        if ( !input.type ) {
            return support;
        }

        input.type = "checkbox"; 
        // checkbox value的默认值是否为 on, 一些是 ''
        support.checkOn = input.value !== "";

        // 下拉选项是否默认选中
        support.optSelected = opt.selected;

        //
        support.reliableMarginRight = true;
        support.boxSizingReliable = true;
        support.pixelPosition = false;

        //  克隆出来的checkbox 选中状态
        input.checked = true;
        support.noCloneChecked = input.cloneNode( true ).checked;

        // 子项跟随父节点禁用
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // type变化时 value值得变化 
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";

        input.setAttribute( "checked", "t" );
        input.setAttribute( "name", "t" );

        fragment.appendChild( input );
        // 克隆文档碎片checked的值
        support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // 仅ie支持focusin, 事件支持冒泡机制
        support.focusinBubbles = "onfocusin" in window;

        // 克隆节点background属性  ie都为''
        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";


    return support;
}
