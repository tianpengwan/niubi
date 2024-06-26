---
title: 🚂JS监听及使用
date: 2024-05-20 10:09:02
tags: snsoft
category: 开发
password: snsoft123
abstract: 本篇文章已加密，需要输入密码查看
message: 本篇文章已加密，需要输入密码查看
wrong_pass_message: 这个密码看着不太对，再试试
wrong_hash_message: 这个文章不能被纠正，不过还是能看看解密后的内容
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161710589721716171058571.png
---

南北有一套自己的客户端框架xjs,特点是通过按规则编写java代码，然后使用底层提供java2js工具

来进行Java代码到js代码的转换。
--实例演示
界面数据提交：Table-->DataSet->DataStore

界面数据加载：DataStore-->DataSet->Table

通常编写js时操作的都是DataSet

### js监听

js监听，放在xjs目录下，命名规则为xxxJSListener

一般继承SystemFunctionListener或者DefaultListener

要写一行代码表示生成的js存放路径， ui/web/



![image-20240514141609855](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/623cca9158c3e75b7858636a66f7a479.png)



```java
/*#
 lib=snsoft/plat/bas.js
#*/
```

![image-20240514152417025](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/dc86957b18cfe9400c4aedf3215fd2af.png)

#### xjs输出目录

xjs目录下有一个Args.txt

关键是把xjs路径下的代码，生成到ui的web目录下 (输入路径，输出路径)

![image-20240514140334107](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/5bb38097033cf66ea035abe6964cd707.png)

生成环境在 xjslib

测试（开发）环境在 xjslib_debug

![image-20240514135012568](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/bbbc3590a5f332e32ce4a8e48901105d.png)

#### 界面上使用

使用`<jslistener>`标签，注意js监听固定是以#new 开头，传参是js格式

![image-20240514140808457](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/493b6dcf03db0fac61de83189640993e.png)

#### 传参

界面上json格式传参

![image-20240514154133058](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/6529611ce28520ca31686b69d299935d.png)

js监听上定义参数名即可，SystemFunctionListener会自动接受参数，可直接调用，如果是DefaultListener则需要再构造函数中接受参数

![image-20240514154151826](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/774bbbded654bf198bf7046b8c771314.png)

#### 附录：JS监听父类

SystemFunctionListener

DefaultListener

DefaultTableListener

js.JSObject

##### SystemFunctionListener

```java
/*#
 lib=snsoft/plat/bas.js
#*/
package snsoft.plat.bas.busi;

import js.JSObject;
import xjs.core.FuncCall;
import xjs.core.Xjs;
import xjs.dx.DataSet;
import xjs.table.DefaultListener;
import xjs.table.Table;
import xjs.ui.util.UIUtil;
/**
 * <p>标题：平台系统功能监听类</p>
 * <p>功能：</p>
 * <p>
 * 其他说明：
 * </p>
 * <p>作者：冀小雷</p>
 * <p>审核：</p>
 * <p>重构：</p>
 * <p>创建日期：2018年5月25日下午2:32:10</p>
 * 查看帮助：<a href="" target="_blank"></a>
 */
public class SystemFunctionListener extends DefaultListener
{
    /**
     * 用于指定此监听应该添加的界面。
     */
    protected String[] tgtUINames;

    public SystemFunctionListener(JSObject<Object> params)
    {
       Xjs.apply(this, params);
    }

    protected static void openUI(UIInfo info)
    {
       // window.console.log("viewinfo=",info);
       if ($bool(info.muiid))
       {
          UIUtil.wopenUI(info.title, info.muiid, info.pm);
       } else if ($bool(info.funcid))
       {
          UIUtil.wopenUI(info.title, UIUtil.getUiid(info.funcid), info.pm);
       } else if($bool(info.url))
       {
          UIUtil.wopen(info.title, info.url);
       }
    }

    private static int lock = 0;

    /**
     * <pre>
     * 用于锁住级联事件：如数量*单价=金额
     * </pre>
     * @param call
     */
    protected static final void lockInvoke(FuncCall call)
    {
       if (lock > 0)
       {
          return;
       }
       try
       {
          lock++;
          call.func.apply(call.scorp, call.args);
       } finally
       {
          lock--;
       }
    }

    /**
     * <pre>
     * 在涉及子表循环计算完成后，将焦点聚焦至计算前的单元格
     * </pre>
     * @param call
     * @param table
     */
    protected static final void returnCellAfterInvoke(FuncCall call, Table table)
    {
       int row = table.dataSet.getRow();
       int col = table.getSelectedColumnIndex();
       call.func.apply(call.scorp, call.args);
       table.focus();
       table.gotoRow(row);
       table.setSelectedColumn(col);
    }

    /**
     * <pre>
     * 判断正负号
     * </pre>
     * @param v
     * @return
     */
    protected static final int signum(double v)
    {
       if (v == 0)
       {
          return 0;
       }
       return v < 0 ? -1 : 1;
    }

    /**
     * <pre>
     * 判断指定的对象是否含有属性
     * </pre>
     * @param o
     * @return
     */
    protected static final boolean isEmpty(JSObject<?> o)
    {
       for (@SuppressWarnings("unused") String name : $names(o))
       {
          return false;
       }
       return true;
    }

    @js.JSCode(jscode = "false")
    protected static void loopSelectRows(js.IFunction<?> f, Table table)
    {
       loopSelectRows(f, table, 0);
    }

    protected static void loopSelectRows(js.IFunction<?> f, Table table, int opts)
    {
       int[] rows = table.getSelectedRowNumbers(opts);
       for (int i = 0; i < rows.length; i++)
       {
          f.invoke(rows[i]);
       }
    }

    protected static void writeCommand(Table table, js.IFunction<?> f, String[] cols, int opts)
    {
       DataSet dataSet = table.dataSet;
       if (dataSet.getRow() < 0)
       {
          return;
       }
       f.invoke((Object[]) null);
       dataSet.refreshByKeyValues($a(dataSet.getKeyValues()).toArray(), cols, opts);
    }

    @Deprecated
    public static String getInnerfld(DataSet dataSet)
    {
       return dataSet.getCuInnerfld();
    }
}
```

##### DefaultListener

```java
/*#
lib=xjs-base.js.~gzip
#*/
package xjs.table;

import xjs.dx.DataSet;
import xjs.dx.DataSetEvent;
import xjs.dx.DataSetRow;
//@js.JSCode(jscode="false")
public class DefaultListener extends DefaultTableListener implements xjs.dx.DataSetListener 
{
    
    @Override
    public void ensureDataSetOpened(DataSet dataSet,DataSetEvent event)
    {
    }
    /*
     * event.columnIndex : 列，
     * event.value : oldValue
     * String columnName = dataSet.getColumn(event.columnIndex).name;
     * 行提交前执行此方法
     */
    @Override
    public void dataSetFieldPosting(DataSet dataSet,DataSetEvent event)
    {
       //Table.getTablesOfDataSet(dataSet)
    }
    /**
     * 行提交后执行此方法
     */
    @Override public void dataSetFieldPosted(DataSet dataSet,DataSetEvent event){}
    
    @Override public void dataSetFieldPostedFinal(DataSet dataSet,DataSetEvent event)
    {
    }
    /**
     * 行移动前执行此方法。
     */
    @Override public void dataSetRowNavigating(DataSet dataSet,DataSetEvent e){
    }
    /**
     * 行移动后执行此方法。
     */
    @Override public void dataSetRowNavigated(DataSet dataSet,DataSetEvent e){}
    //@Override
    //public void dataSetRowValuesReplaced(DataSet dataSet,DataSetEvent e){}
    /**
     * 添加行后执行
     */
    @Override
    public void dataSetRowAdded(DataSet dataSet,DataSetEvent e){}
    /**
     * 行删除前执行
     */
    @Override
    public void dataSetRowDeleting(DataSet dataSet,DataSetEvent e){}
    /**
     * 行删除后执行
     */
    @Override public void dataSetRowDeleted(DataSet dataSet,DataSetEvent e){}
    /**
     * 存盘前执行
     */
    @Override
    public void dataSetSaving(DataSet dataSet,DataSetEvent e){}
    /**
     * 存盘后执行
     */
    @Override
    public void dataSetSaved(DataSet dataSet,DataSetEvent e){}
    /**
     * dataset刷新前执行
     */
    @Override
    public void dataSetRefreshing(DataSet dataSet,DataSetEvent e){}
    /**
     * dataset刷新后执行
     */
    @Override
    public void dataRefreshed(DataSet dataSet,DataSetEvent e){}
    /**
     * 数据加载前执行
     */
    @Override
    public void dataLoading(DataSet dataSet,DataSetEvent e){}
    /**
     * 数据加载后执行
     */
    @Override
    public void onDataLoad(DataSet dataSet,DataSetEvent e){}
    /**
     * 数据加载后执行
     */
    @Override
    public void dataLoaded(DataSet dataSet,DataSetEvent e){}
    @Override
    public void masterNulDataLoaded(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataClosed(DataSet dataSet,DataSetEvent e){}
    @Override
    public void requestPostPending(DataSet dataSet,DataSetEvent e){}
    @Override
    public void requestCencelPending(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataSetRowEditing(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataSetRowUnedited(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataSetRowPosting(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataSetRowPosted(DataSet dataSet,DataSetEvent e){}
    /**
     * 行选中后执行
     */
    @Override
    public void dataSetRowSelected(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataSetChanged(DataSet dataSet,DataSetEvent e){}
    @Override
    public void dataSetGrouped(DataSet dataSet,DataSetEvent e){}
//  @Override
//  final public void addTableNotify(Table obj) {
//  }
//  final public void addNotify(DataSet obj) {
//  }
    @Override
    public void addDataSetNotify(DataSet dataSet)
    {
    }
    /**
     * 行选中前执行
     */
    @Override
    public void dataSetRowSelecting(DataSet dataSet,DataSetEvent e)
    {
    }
    /**
     * 全选前执行
     */
    @Override
    public void dataSetAllRowSelecting(DataSet dataSet,DataSetEvent e)
    {
    }
    /**
     * 全选后执行
     */
    @Override
    public void dataSetAllRowSelected(DataSet dataSet,DataSetEvent e)
    {
    }
    
    @Override
    public boolean isRowDeleteable(DataSet dataSet, int row, DataSetEvent e) 
    {
       return (Boolean)undefined;
    }
    
    @Override
    public void dataSetTreeChildNodesLoading(DataSet dataSet,DataSetEvent e)
    {
    }
    
    @Override
    public void refreshingByKeyValue(DataSet ds,js.JSObject pm)
    {
    }
    
    @Override public void refreshedByKeyValue(DataSet ds,DataSetEvent e)
    {
    }
    
    @Override public void onDataSetNewRowValues(DataSet ds,DataSetRow row,DataSetEvent e)
    {
    }

}


/*
dataSetRowNavigated:function(dataSet)
{
var item;
var ps = this.queryParams = this.table. 
  snsoft.DialogPane.getFormValues(this.table.queryPane, 3);
var params = "reportType=month";

if( typeof(store.selectedRow)=='number' && store.selectedRow>=0 )
{
 var record = store.getAt(store.selectedRow);
 item = record.data.item;

    if(item == "件数"){
       params += "&statType=packages";
    }else if(item == "毛重"){
       params += "&statType=grossweight";
    }else if(item == "体积"){
       params += "&statType=volume";
    }else if(item == "TEU"){
       params += "&statType=qty";
    };

};
params += "&SHEETCODES=8015004,8015005,8015023&ACCODE=00";
for(var n in ps)params += "&"+n+"="+ps[n];
Ext.getCmp('50.OceanShippingReport01.03').setSRC("logistics/oceanChart.jsp?"+params);
}
*/
```

##### DefaultTableListener

```java
/*#
lib=xjs-base.js.~gzip
#*/
package xjs.table;

import js.DataTransfer;
import js.Event;
import js.JSMath;
import js.JSObject;
import xjs.chart.Chart;
import xjs.table.RGridTable.GRecord;
import xjs.ui.Component;
import xjs.ui.Container;
import xjs.ui.DialogPane;
//@js.JSCode(jscode="false")
public class DefaultTableListener extends js.JSObject implements TableListener
{
    protected JSObject<Object> initValues;

    @Override
    public void initComponent(Table table, js.JSObject<Object> values)
    {
       if (initValues == null)
       {
          initValues = values;
       }
    }

    protected final Table getTable(Container c, String name)
    {
       return (Table) c.getRootComponent().getMainComponentByName(name);
    }

    @Override
    public void afterInitComponent(Table table)
    {
    }

    @Override public void onLazyLoaded(Table table) {
    }
    
    @Override
    public void addTableNotify(Table table)
    {
    }

    @Override
    public void beforeConfigColumns(Table table)//, TableEvent e) 
    {
    }

    @Override
    public boolean onTablePrinting(Table table, TableEvent e)
    {
       return (Boolean) undefined;
    }

    @Override
    public void beforeTablePrint(Table table, TableEvent e)
    {
    }

    @Override
    public boolean checkTablePrintProgress(Table table, TableEvent e, xjs.util.ConfirmRequest ra[])
    {
       return (Boolean) undefined;
    }

    // TS1406060056;打印增加打印后的接口事件
    @Override
    public void afterTablePrint(Table table, TableEvent e)
    {
    }

    @Override
    public void onTableCellClick(Table table, TableEvent e)
    {
    }

    @Override
    public void onTableRowRender(Table table, TableEvent e)
    {
    }

    @Override
    public void onTableDblClick(Table table, TableEvent e)
    {
    }

    @Override
    public void tableFocusGained(Table table, TableEvent e)
    {
    }

    @Override
    public void performCommand(Table table, String command, Object src)
    {
    }

    /*
     * e.forTblColumn : 辅助输入列
     * @see xjs.table.TableListener#itemAidInputing(xjs.table.Table, xjs.table.TableEvent)
     */
    @Override
    public void itemAidInputing(Table table, TableEvent e)//Component item,xjs.ui.Cell forTblColumn)
    {
    }

    // @Override
    // public void addNotify(Object obj) {
    // }
    @Override
    final public void addNotify(Table table)
    {
    }

    @Override
    public void prepareInitParameter(Table table, JSObject values)
    {
    }

    @Override
    public void onRendering(Table comp)
    {
    }

    @Override
    public void onRender(Table comp)
    {
    }

    @Override
    public void onChartCreating(Table table, xjs.chart.Chart chart, TableEvent e)
    {
    }

    /*
    @Override
    public void onChartDrawing(Table table,xjs.chart.Chart chart,TableEvent e)
    {
    } */
    @Override
    public void onBuildChartLabels(Table table, xjs.chart.Chart chart, TableEvent e)
    {
    }

    @Override
    public void onChartCreated(Table table, xjs.chart.Chart chart, TableEvent e)
    {
    }

    @Override public void onChartDblClick(Table table, xjs.chart.Chart chart, TableEvent e)
    {
    }

    @Override public void onTableCellMoved(Table table, TableEvent e)
    {
    }

    @Override public void onTableRowMoved(Table table, TableEvent e)
    {
    }

    @Override public void onTableCellRender(Table table, TableEvent e)
    {
    }

    @Override public void tableCellNavigated(Table table, TableEvent e)
    {
    }

    @Override public void tableRefreshing(Table table, TableEvent e)
    {
    }

    @Override
    public void tableRefreshed(Table table, TableEvent e)
    {
    }

    @Override
    public void onAttachmentUploaded(Table table, TableEvent e)
    {
    }

    @Override
    public void wfActionSubmitted(Table table, TableEvent e)
    {
    }

    // dataSetRowSelected
    // @Override
    // public void valueExchange(Table comp,js.JSObject values,int xflags)
    // {
    // }
    // @Override
    // public boolean validateValue(Table comp)
    // {
    //    return true;
    // }
    // @Override
    // public TaskPerofrmParameter onWfCommand(Table table,TaskPerformListener taskPerform,TaskPerofrmParameter invokeParams, String command,JSObject params) 
    // {
    //    return null;
    // }
    @Override
    public boolean isRowPopupEditable(Table table, int row, TableEvent e)
    {
       return (Boolean) undefined;
    }

    // @Override
    @js.JSCode(jscode = "false")
    //@Deprecated
    public void onPopupEditDialogShowing(Table table, RecordTable edTbl)
    {
    }

    @Override
    public void onPopupEditDialogShowing(Table table, RecordTable edTbl, DialogPane dlg)
    {
    }

    @Override
    public void beforePopupEditClosing(Table table, String editUiname, String command, TableEvent e)
    {
    }

    // @Override
    @Deprecated
    @js.JSCode(jscode = "false")
    public void beforePopupEditClosing(Table table, String editUiname, String command)
    {
    }

    @Override
    public void onPopupEditClosing(Table table, String editUiname, String command)
    {
    }
    
    @Override
    public void onPopupEditClosed(Table table,String editUiname,String command)
    {
    }

    @Override
    public boolean isRowSelectable(Table table, int row, TableEvent e,boolean unsel)
    {
       return (Boolean) undefined;
    }

    @Override
    public void onShowing(Table comp)
    {
    }

    @Override
    public void onPopupEditOk(Table table, String editUiname)
    {
    }

    @Override
    public String getDeleteRowPrompt(Table table, TableEvent e)
    {
       return null;
    }

    @Override
    public void checkNonBlankOnSubmit(Table table, TableEvent e, NullTableCellValueOnSubmit[] nulVals)
    {
    }

    @Override
    public void prepareLoadPrtfmtNames(Table table, TableEvent e, js.JSObject pm)
    {
    }

    @Override
    public void filterPrintFormatSelect(Table table, xjs.table.tools.TablePrint.PrintFormatSelect[] list)
    {
       /*
       for(int j=list.length-1;j>=0;j--)
       {
          if( 不要 list[j] )
          {
             Array.splice(list, j, 1);
          } 
       }
       */
    }

    // @Override
    // public void tableColumnFocused(Table table,TableEvent e)
    // {
    // }
    @Override
    public String getCloseRequest(Table table, TableEvent e)
    {
       return null;
    }

    @Override
    public void beforeCreateRGridColumn(RGridTable table, xjs.ui.Component comp, TableEvent e)
    {
    }

    @Override
    public int getGridPreExRowCount(GridTable table, int r, TableEvent e)
    {
       return (Integer) undefined;
    }

    /*
     *  *  r  -- dataSet 的对应行
     *  gr --  rows[gr]  
     *  ri --  0 : 数据行
     *         1 ：下面的 附加行
     *        -1 : 上面的附加行  
     */
    @Override
    public void renderGridExRow(GridTable table, final int r, final int gr, int ri, TableEvent e)
    {
    }

    @Override
    public void onCreateRGridRecord(RGridTable table, xjs.table.RGridTable.GRecord gr, TableEvent e)
    {
    }

    @Override
    public void onRGridRecordRendering(RGridTable table, RGridTable.GRecord gr, TableEvent e)
    {
    }

    @Override
    public void onRGridRecordRender(RGridTable table, RGridTable.GRecord gr, TableEvent e)
    {
    }

    /*
     * 取 e.row 行 分组 ID
     */
    @Override
    public GTableRowGroup getGTableRowGroup(Table table, TableEvent e)
    {
       return (GTableRowGroup) undefined;
    }

    @Override
    public void initGTableRowGroup(Table table, TableEvent e)
    {
    }

    @Override
    public void getXlsCellRenderInfo(xjs.xls.XlsTable table, xjs.xls.RenderInfo ri, TableEvent e)
    {
    }

    @Override
    public boolean postPendingXlsCellValue(xjs.xls.XlsTable table, xjs.xls.Cell cell, String value, TableEvent e)
    {
       return (Boolean) undefined;
    }

    @Override
    public void onXlsCellValuePosted(xjs.xls.XlsTable table, xjs.xls.Cell cell, String value, TableEvent e)
    {
    }

    @Override
    public boolean onXlsTablePreview(xjs.xls.XlsTable table, TableEvent e)
    {
       return (Boolean) undefined;
    }

    @Override
    public boolean onTableGotoPage(Table table, int page)
    {
       return (Boolean) undefined;
    }

    @Override
    public boolean onTableUpdatePageRows(Table table, int pageRows)
    {
       return (Boolean) undefined;
    }

    @Override
    public xjs.util.ConfirmRequest getTableSaveRequest(Table table, TableEvent e)
    {
       return (xjs.util.ConfirmRequest) undefined;
    }

    @Override
    public void getConfirmCloseRequest(Table table, xjs.util.ConfirmRequest[] to, TableEvent e)
    {
       //return (xjs.util.ConfirmRequest[])undefined;
    }

    @Override
    public void onTableRendered(Table table)
    {
    }

    @Override
    public void onTableRefreshFail(Table table, TableEvent e)
    {
    }

    @Override
    public void onTableCheckShowing(Table table, TableEvent e)
    {
    }

    @Override
    public boolean isTableDataChanged(Table table, TableEvent e)
    {
       return (Boolean) undefined;
    }

    @Override
    public void onTableDataExporting(Table table, TableEvent e)
    {
    }

    @Override
    public void onPageNavPaneAttached(Table table, TableEvent e)
    {
    }

    @Override
    public js.Error onTableError(Table table, TableEvent e)
    {
       return (js.Error) undefined;
    }
    /*
    @Override
    public boolean updatePrivColCfgInfo(Table table,UPrivColumnsInfo info,int backupUTblInfo,int opts)
    {
       return (Boolean)undefined;
    } */

    @Override
    public void onChartDomCreated(Table table, Chart chart, TableEvent e)
    {
    }

    /*
     * (non-Javadoc)
     * @see xjs.table.TableListener#onTableUpdateToolbarStatus()
     */
    /*
    @Override
    public void onTableUpdateToolbarStatus(Table table,TableEvent e)
    {
    }
    */
    @Override
    public void onTableUpdateSaveable(Table table, TableEvent e)
    {
    }

    @Override
    public void onChkingRowNonBlank(Table table, TableEvent e, NullTableCellValueOnSubmit[] va)
    {
    }
    
    @Override
    public js.HTMLElement getRGridRecordParentDOM(RGridTable tbl,GRecord gr,js.HTMLElement pdom)
    {
       return (js.HTMLElement) undefined;
    }

    protected int round(double v, int deci)
    {
       //deci + 8 防止客户端js精度问题，必须是8，否则不准确
       return exeRound(exeRound(v, deci + 8), deci);
    }

    private int exeRound(double v, int deci)
    {
       double n = JSMath.pow(10, deci);
       return (int) (js.JSMath.round(v * n) / n);
    }

    protected int round2(double v)
    {
       return round(v, 2);
    }

    @Override
    public void onTableDrop(Table table, DataTransfer dataTransfer, TableEvent e)
    {
    }

    @Override
    public boolean isCellPostValue(Component cell, Event e)
    {
       return false;
    }

    @Override
    public void prepareUReportParams(Table table, TableEvent e)
    {
    }
    @Override
    public String getGroupDataParamTblid(Table table) {
       return (String)undefined;
    }
    public boolean isTableDoable(Table table, TableEvent e,String cmd) {
       return (Boolean)undefined;
    }
}
/*
 //window.location.href='logistics/confirmOrdCabin.jsp?ordicode='+record.get('ordicode');

  JS 例子：
   onTableDblClick:function(table)
   {
       var ordicode = table.dataSet.getValue("ordicode");
        if( ordicode!=null )
            window.open("logistics/confirmOrdCabin.jsp?ordicode="+ordicode,"_blank");  
   }
   
   
 */
```

##### js.JSObject

```java
package js;

//import xjs.core.Xjs;
//import js.*;
// js.JSObject
@JSCode(name = ".Object")
public class JSObject<T> //  implements js.JSObjectI<T>
{
	@JSCode(name = "{}")
	public JSObject()
	{
	}

	@JSCode(name = ".window")
	static final protected Window       window    = new Window();
	@JSCode(name = ".document")
	static final protected HTMLDocument document  = new HTMLDocument();
	@JSCode(name = ".navigator")
	static final protected Navigator    navigator = new Navigator();
	/*
	 * 在javascript中，this通常指向的是我们正在执行的函数本身，或者是指向该函数所属的对象（运行时）。
	 */
	@JSCode(name = ".this")
	static final protected JSObject<?>     $this     = null;
	//static protected
	//	static {
	//		window = null;
	//		document = null;
	//		navigator = null;
	//	}

	/**
	 * typeof 运算符返回一个用来表示表达式的数据类型的字符串。
	 * 可能的字符串有："number"、"string"、"boolean"、"object"、"function" 和 "undefined"。
	 * typeof的运算数未定义,返回的就是 "undefined".
	 * 运算数为数字 typeof(100) = "number"
	 * 字符串 typeof("abc") = "string"
	 * 布尔值 typeof(true) = "boolean"
	 * 对象,数组和 null typeof(x) = "object"
	 * 函数 typeof(x) = "function"
	 */
	@JSCode(name = ".typeof")
	static native final public String typeof(Object v);

	@JSCode(name = ".eval")
	static native final public Object eval(String json);

	/*
	 * eval
	 * 与 window.eval
	 * 调用  传入 的  this 对象  不同， 一个 是 当前 this, 一个 是 window
	 *   有些情况下 需要
	 */
	@JSCode(name = ".eval")
	native final public Object weval(String json);
	
	/*
	 * signed 64 bit integer 
	 */
	@JSCode(name = ".BigInt")
	static native final public long BigInt(long x);

	@JSCode(name = ".BigInt")
	static native final public long BigInt(String x);
	/*
	 * Array.callSlice(arguments,1) // 第一个后的参数...
	 * Array.prototype.slice.call(arguments,1);
	 * Array.prototype.slice.call(arguments);
	 */
	@JSCode(name = ".arguments")
	static protected Object arguments[] = null;//new Object[0];
	/*
	     遍历 
	 */

	@JSCode(name = ".${1}")
	static native final public Iterable<String> $names(Object obj);

	// @JSCode(name=".${0}[${1}]=${2}") : $set 由 InvokeExpression 特殊处理
	//@Override
	public final T $set(String name, T value)
	{
		return value;
	}

	//	@Override
	public final T $set(int name, T value)
	{
		return value;
	}

	/*
	 *  name in this
	 */
	public native final boolean hasElement(String name);

	//	@Override
	public native T $get(String name);

	//	@Override
	public native T $get(int name);

	static public native final Object $get(Object obj, String name);

	static public native final boolean $getAsBool(Object obj, String name);

	static public final void $set(Object obj, String name, Object value)
	{
	}

	//	@Override
	public native final boolean $getAsBool(String name);

	@JSCode(name = ".${0}$<.>${@1}")
	public native final boolean hasMethod(String name);
	//@JSCode(name=".${0} instanceof ${1}")
	//native public boolean instanceOf(js.Function f);
	/*
	 this.$getAsFunction("onOk")
	 == this.onOk
	 */
	//	@Override
	/*
	 * (js.IFunction_V1<js.Event<?>>)this::
	 * ((js.IFunction_V2<String,Object[]>)this::
	 */
	
	public native final js.Function $getAsFunction(String name);

	public native final int $getAsInt(String name);

	/*
	     x[name]
	 */
	public native final String $getAsString(String name);

	@JSCode(name = ".${@1}")
	static public final Object $$(Object value)
	{
		return null;
	}

	@JSCode(name = ".${@1}")
	static public final boolean $$asBool(Object value)
	{
		return true;
	}

	/*
	   $$asFunction("Xjs.falseFn");
	   $$asFunction("Xjs.ui.GridTable.method");
	   JSObject.$$asFunction("Xjs.ui.CellRenderer.defaultRenderer")
	   
	 */
	//@Deprecated
	@JSCode(name = ".${@1}")
	static public final Function $$asFunction(Object value)
	{
		return null;
	}

	@JSCode(name = ".${1}")
	static public final Object $obj(Object value)
	{
		return value;
	}

	/*
	     $$regexp("^(\\.?)([^=]+)(?:=([^=]*))?$")
	   =>
	     /^(\.?)([^=]+)(?:=([^=]*))?$/
	 */
	@JSCode(name = "./${@1}/")
	static public final RegExp $$regexp(String expr)
	{
		return null;
	}

	@JSCode(name = "./${@1}/${@2}")
	static public final RegExp $$regexp(String expr, String flags)
	{
		return null;
	}

	/*
	    $o(n1,v1,n2,v2,n3,v3) === {n1:v1,n2:v2,n3:v3};
	 */
	static public final JSObject $o(Object... args)
	{
		return new JSObject();
	}

	static public final <T> Array<T> $a(T... args)
	{
		return null;
	}
	@JSCode(name="Object.keys(${1})")
	public static final Array<String> keys(Object o)
	{
		return null;
	}
	//	@JSCode(name=".${0}.${@1}")
	//	public native final Object $valueOf(String name);

	/**
	 * <pre>
	 * 此方法数值类型不可用，因为0或0.0都会反馈false。
	 * </pre>
	 *
	 * @param value
	 * @return
	 */
	@JSCode(name = ".${1}")
	static public final boolean $bool(Object value)
	{
		return value != null;
	}

	/**
	 * <pre>
	 * 此方法数值类型不可用，因为0或0.0都会反馈false。
	 * </pre>
	 *
	 * @param value1
	 * @param values
	 * @return
	 */
	@js.JSCode(name = ".${1}$<||>${2*}")
	static public final <T> T $or(T value1, Object... values)
	{
		if (value1 != null)
			return value1;
		for (int i = 0; i < values.length; i++)
			if (values[i] != null)
				return (T) values[i];
		return null;
	}

	@js.JSCode(name = ".${1}$<||>${2*}")
	static public final String $orAsString(Object value1, Object... values)
	{
		if (value1 != null)
			return (String) value1;
		for (int i = 0; i < values.length; i++)
			if (values[i] != null)
				return (String) values[i];
		return null;
	}

	@js.JSCode(name = ".${1}$<||>${2*}")
	static public final boolean $orAsBool(Object value1, Object... values)
	{
		if (value1 != null)
			return true;
		for (int i = 0; i < values.length; i++)
			if (values[i] != null)
				return true;
		return false;
	}

	@js.JSCode(name = ".${1}$<||>${2*}")
	static public final int $orAsInt(Object value1, Object... values)
	{
		return 0;
	}

	//	@js.JSCode(name=".${1}$<||>${2*}")
	//	static public final int $orAsInt(int value1,int... values)
	//	{
	//		return 0;
	//	}
	@js.JSCode(name = ".${1}$<===>${2}")
	static public final boolean $ieq(Object v1, Object v2)
	{
		return true;
	}

	@js.JSCode(name = ".${1}$<==>${2}")
	static public final boolean $eq(Object v1, Object v2)
	{
		return true;
	}

	@js.JSCode(name = ".${1}$<!==>${2}")
	static public final boolean $notieq(Object v1, Object v2)
	{
		return true;
	}

	@js.JSCode(name = ".${1}$<<>${2}")
	static public native final boolean $lt(Object v1, Object v2);

	@js.JSCode(name = ".${1}$<>>${2}")
	static public native final boolean $gt(Object v1, Object v2);

	@js.JSCode(name = ".${1}$<<=>${2}")
	static public native final boolean $le(Object v1, Object v2);

	@js.JSCode(name = ".${1}$<>=>${2}")
	static public native final boolean $ge(Object v1, Object v2);

	@JSCode(name = ".{}")
	static public final JSObject $empty    = null;
	@JSCode(name = ".undefined")
	static public final Object   undefined = null;

	@JSCode(name = ".${1}===undefined")
	static public final boolean $undefined(Object value)
	{
		return value != null;
	}

	@JSCode(name = ".${1}!==undefined")
	static public final boolean $defined(Object value)
	{
		return value != null;
	}

	@JSCode(name = ".new RegExp(${1})")
	static public final RegExp $regexp(String pattern)
	{
		return new RegExp(pattern);
	}

	@JSCode(name = ".new RegExp(${1},${2})")
	static public final RegExp $regexp(String pattern, String flags)
	{
		return new RegExp(pattern, flags);
	}
	// method: 应该 是 当前类的方法: InvokeExpression 中特殊处理， Object.$funcDelegate
	/*
	    void  func1(...) {
	    }
	    each(Function.$funcDelegate("func1"))
	    编译成：
	    each( function(...){
	    } )
	        
	 */
	/*
	@Deprecated
	static public final Function $funcDelegate(String method)
	{
		return new Function();
	}
	*/

	@JSCode(name = ".String.fromCharCode(${1})")
	static public native String fromCharCode(int c);

	public native boolean hasOwnProperty(String name);

	@JSCode(name = ".delete ${1}")
	static public native void delete(Object value);

	static public JSObject prototype;
	/*
	 * F.prototype.constructor === F
	 */
	public        Function constructor;

	/*
	 createDelegate("<方法名>",this);
	1： 
	 this.createDelegate("updateScrollbar", this);
	     => this.updateScrollbar.createDelegate(this);
	2：     
			if( this.expandDelegate==null )
	               this.expandDelegate = createDelegate("expand",this); 
	            	   //this.expand.createDelegate(this);
	            js.Window.setTimeout(this.expandDelegate,1);	    
	            
	3:
	  	  void onToolbarBtnClicked(js.Event e, String command)
	    {
		    window.console.log("onToolbarBtnClicked:command="+command);
	    } 
	    js.Function fn = this.createDelegate("onToolbarBtnClicked",new String[]{"save"},true);
	    DOM.addListener(dom, "click", fn);             
	 */

	/**
	 * 废弃： 使用   ((js.IFunction_V)this::xxxxx).createDelegate(this);方式
	 */
	@Deprecated
	@JSCode(name = ".${0}.${@1}.createDelegate(${2})")
	public Function createDelegate(String method, Object _this)
	{
		return null;
	}

	@JSCode(name = ".Xjs._getDelegate0(${0},${1})")
	public Function getDelegate0(String method)
	{
		return null;
	}

	/*
	 * this.onSuccess.createDelegate(this),
	 */
	/*
	 * 废弃： 使用   ((js.IFunction_V)this::xxxxx).createDelegate(this);方式
	 */
	/*
@Deprecated	
	@JSCode(name = ".${0}.${@1}.createDelegate(${0})")
	public Function createDelegate(String method)
	{
		return null;
	}
*/
	//@JSCode(name="{${0}.${@1},${0}}")
	/*
	 * InvokeExpression 特殊处理：
	 * 废弃: 使用 bindAsFunctionCall
	 */

	public xjs.core.FuncCall $getFunctionCall(String name)
	{
		return new xjs.core.FuncCall(this.$getAsFunction(name), this);
	}

	/*
	 * 废弃: 使用 bindAsFunctionCall
	 */
	public xjs.core.FuncCall $getFunctionCall(String name, Object args[])
	{
		return new xjs.core.FuncCall(this.$getAsFunction(name), this, args);
	}

	/*
	 * 废弃: 使用 bindAsFunctionCall
	 */
	public xjs.core.FuncCall $getFunctionCall(String name, Object args[], int argMode)
	{
		return new xjs.core.FuncCall(this.$getAsFunction(name), this, args, argMode);
	}

	/*
	 * InvokeExpression 特殊处理：
	 */
	public xjs.core.FuncCall bindAsFunctionCall(js.IFunction<?> f)
	{
		return new xjs.core.FuncCall(f, this);
	}

	public xjs.core.FuncCall bindAsFunctionCall(js.IFunction<?> f, Object args[])
	{
		return new xjs.core.FuncCall(f, this, args);
	}

	/*
	   
	   void myMethod(js.Event arg1,String s1,int i1)
	   {
	   		
	   }
	 */
	@JSCode(name = ".${0}.${@1}.createDelegate(${0},${2*})")
	public Function createDelegate(String method, Object args[], boolean appendArgs)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${0}.${@1},${2})")
	public Function bindAsEventListener(String method, Object _this)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${2})")
	public Function bindAsEventListener(js.IFunction method, Object _this)
	{
		return null;
	}

	/*
	    Function.bindAsEventListener(this.method,this)
	 */
	@Deprecated
	@JSCode(name = ".Function.bindAsEventListener(${0}.${@1},${0})")
	public Function bindAsEventListener(String method)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${0})")
	public Function bindAsEventListener(js.IFunction f)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${0})")
	public js.Function bindAsEventListener(js.IFunction_V f)
	{
		return null;
	}

	/*
	 * this.bindAsEventListener((js.IFunction_V1<js.Event>) this::onEvent);
	 */
	@JSCode(name = ".Function.bindAsEventListener(${1},${0})")
	public js.Function bindAsEventListener(js.IFunction_V1<js.Event<?>> f)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${0}.${@1},${2*})")
	public js.Function bindAsEventListener(String method, Object _this, int timeout)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${2*})")
	public js.Function bindAsEventListener(js.IFunction<?> method, Object _this, int timeout)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${2*})")
	public js.Function bindAsEventListener(js.IFunction<?> method, final Object _this, final int timeout, final boolean catchErr, final xjs.ui.Component forcus, Object exArgs[])
	{
		return null;
	}

	//static public Function bindAsEventListener(Function func,Object _this,int timeout,boolean cacthErr)
	/*
	 *
	 */
	/*
	 * function on...(e)
	{
	try {
		return _this.method.call(_this,e||window.event);
	} catch( ex  )
	{
	}
	}
	 */
	@Deprecated
	@JSCode(name = ".Function.bindAsEventListener(${0}.${@1},${2*})")
	public js.Function bindAsEventListener(String method, Object _this, int timeout, boolean cacthErr)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${2*})")
	public js.Function bindAsEventListener(js.IFunction<?> method, Object _this, int timeout, boolean cacthErr)
	{
		return null;
	}

	@Deprecated
	@JSCode(name = ".Function.bindAsEventListener(${0}.${@1},${2*})")
	public js.Function bindAsEventListener(String method, Object _this, int timeout, boolean cacthErr, xjs.ui.Component focus)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${2*})")
	public js.Function bindAsEventListener(js.IFunction<?> method, Object _this, int timeout, boolean cacthErr, xjs.ui.Component focus)
	{
		return null;
	}

	@JSCode(name = ".Function.bindAsEventListener(${1},${0},${2*})")
	public js.Function bindAsEventListener(js.IFunction_V1<js.Event<?>> method, int timeout, boolean cacthErr)
	{
		return null;
	}

	// int interval,int maxTimes,Object..._args);
	//@Deprecated
	@JSCode(name = ".Function.intervalCall(${0}.${@1},${2*})")
	public void intervalCall(String method, Object _this, int interval, int maxTimes, Object... _args)
	{
	}

	@JSCode(name = ".Function.setTimeout(${0}.${@1},${2*})", jscode = "false")
	public void invokeLatter(String method, Object scope, int timeout, boolean catchErr, Object... _args)
	{
	}

	/*
	  method : 必须为常量：
	 */
	@JSCode(name = ".${0}.${@1}(${2*})")
	public Object invokeMethod(String method, Object... args)
	{
		return null;
	}

	@JSCode(name = ".(${0}.${@1}?${0}.${@1}(${3*}):${2})")
	public Object invokeMethodIf(String method, Object defaultValue, Object... args)
	{
		return null;
	}
	//	@JSCode(name=".(${0}.${@1}?${0}.${@1}(${3*}):${2})")
	//	public void invokeMethodIf(String method,Object... args)
	//	{
	//	}

	/*
	 *
	 */
	@JSCode(name = ".new ${1}(${2*})")
	static public Object newObject(js.IFunction clazz, Object... args)
	{
		return null;
	}

	@JSCode(name = ".${0} instanceof ${1}")
	public boolean instanceOf(Class clazz)
	{
		return false;
	}

	@JSCode(name = ".${0} instanceof ${1}")
	public boolean instanceOf(js.IFunction clazz)
	{
		return false;
	}

	/*
	 * "xxx".__proto__ == String.prototype
	 */
	public js.JSObject<?>  __proto__;
	/*
	    例子：
	 */
	/*
	private js.Function bindAsEventListener(String method)
	{
		final js.Function f = this.$getAsFunction(method);
		final Object _this = this;
		return (js.Event ev)->
			{
				return f.call(_this,$or(ev,window.event));
		};
	}	
	*/
	/*
	 * Firefox
	 */
	@JSCode(name = ".browser")
	static final protected Browser browser = new Browser();

	native final static public js.Prototype getPrototypeOf(Object o);

	//
	// 测试 使用
	//
	public String _js$className_;
}
/*
表达式转换测试例子：
   $orAsString("111","222").split("|");
   $orAsString("111","222").split($orAsString("|","+"));
*/

```

### ui监听

ui监听写在ui目录下，命名规则xxxUIListener，一般继承DefaultUIListener

![image-20240514141257760](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/56d9fbe0adf4899199e44a427c7ada2d.png)

#### 拿到数据

![image-20240514142712111](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/cd6961d1d11e21385a27ba5597769040.png)



#### 界面使用

使用`<uilistener>`标签，注意js监听固定是以.new结尾，传参是http格式，多个参数需要用`CDATA`标签

![image-20240514152542148](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/59fef5a57fe48f3292f980e597369b83.png)

#### 传参

界面上http格式传参

![image-20240514152924947](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/b70883dc1ca530e68648033c9e60e69a.png)

js监听上定义参数名即可，SystemFunctionListener会自动接受参数，可直接调用，如果是DefaultUIListener则需要再构造函数中接受参数

![image-20240514153005299](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-14/2991b7933d3bcf6a75a7fccebd732fc0.png)
