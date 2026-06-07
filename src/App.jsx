import { useState, useCallback } from 'react'
import './App.css'

// 硬笔书法字体选项
const fontOptions = [
  { id: 'wenkai', name: '霞鹜文楷', family: 'LXGW WenKai', style: '硬笔楷书' },
  { id: 'wenkai-screen', name: '霞鹜文楷屏幕版', family: 'LXGW WenKai Screen', style: '硬笔楷书' },
  { id: 'wenkai-mono', name: '霞鹜文楷等宽', family: 'LXGW WenKai Mono', style: '硬笔楷书' },
  { id: 'kaiti', name: '系统楷体', family: 'KaiTi, 楷体, STKaiti', style: '传统楷书' },
  { id: 'xiaowei', name: '站酷小薇', family: 'ZCOOL XiaoWei', style: '可爱清秀' },
  { id: 'kuaile', name: '站酷快乐体', family: 'ZCOOL KuaiLe', style: '活泼可爱' },
  { id: 'longcang', name: '龙藏体', family: 'Long Cang', style: '可爱手写' },
  { id: 'zhimang', name: '芝忙行', family: 'Zhi Mang Xing', style: '趣味手写' },
  { id: 'huangyou', name: '站酷庆科黄油体', family: 'ZCOOL QingKe HuangYou', style: '圆润可爱' },
  { id: 'mashanzheng', name: '马山正', family: 'Ma Shan Zheng', style: '圆润手写' },
  { id: 'liujianmaocao', name: '柳建毛草', family: 'Liu Jian Mao Cao', style: '圆润草书' },
  { id: 'zenmaru', name: 'Zen圆体', family: 'Zen Maru Gothic', style: '柔软优雅' },
  { id: 'yuseimagic', name: 'Yusei魔法体', family: 'Yusei Magic', style: '俏皮POP' },
  { id: 'klee', name: 'Klee手写体', family: 'Klee One', style: '亲切硬笔' },
  { id: 'huninn', name: '粉圆体', family: 'Huninn', style: '圆润甜美' },
]

// 常用汉字预设
const presetCharacters = [
  '永', '之', '也', '以', '一', '二', '三', '四', '五',
  '六', '七', '八', '九', '十', '大', '小', '中', '人',
  '天', '地', '日', '月', '水', '火', '木', '金', '土',
  '东', '西', '南', '北', '春', '夏', '秋', '冬', '风',
  '花', '雪', '月', '山', '河', '湖', '海', '云', '雨'
]

function App() {
  const [characters, setCharacters] = useState('永字八法')
  const [practiceCount, setPracticeCount] = useState(4)
  const [showPinyin, setShowPinyin] = useState(false)
  const [gridType, setGridType] = useState('tian') // 'tian' 或 'mi'
  const [selectedFont, setSelectedFont] = useState('wenkai')

  const handleAddPreset = useCallback((char) => {
    setCharacters(prev => prev + char)
  }, [])

  const handleClear = useCallback(() => {
    setCharacters('')
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  // 获取当前选择的字体
  const currentFont = fontOptions.find(f => f.id === selectedFont)?.family || 'LXGW WenKai'

  // 将输入的字符按行分割，保留换行信息
  const lines = characters.split('\n').filter(line => line.trim())
  const charLines = lines.map(line => line.split('').filter(char => char.trim()))

  // 生成练习格子，按行组织
  const practiceLines = charLines.map((lineChars, lineIndex) => {
    const cells = []
    lineChars.forEach((char, charIndex) => {
      for (let i = 0; i < practiceCount; i++) {
        cells.push({
          char: i === 0 ? char : '',
          isSample: i === 0,
          key: `${lineIndex}-${charIndex}-${i}`
        })
      }
    })
    return cells
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>楷书字帖练习</h1>
        <p className="subtitle">练习书法，修身养性</p>
      </header>

      <div className="controls no-print">
        <div className="control-group">
          <label>输入汉字（支持多行，按回车换行）：</label>
          <textarea
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
            placeholder="请输入要练习的汉字...\n支持多行输入，每行会单独显示"
            rows={4}
          />
        </div>

        <div className="control-group">
          <label>常用汉字：</label>
          <div className="preset-chars">
            {presetCharacters.map((char) => (
              <button
                key={char}
                className="preset-btn"
                onClick={() => handleAddPreset(char)}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label>每个字练习次数：</label>
            <select
              value={practiceCount}
              onChange={(e) => setPracticeCount(Number(e.target.value))}
            >
              <option value={1}>1次</option>
              <option value={2}>2次</option>
              <option value={4}>4次</option>
              <option value={6}>6次</option>
              <option value={8}>8次</option>
            </select>
          </div>

          <div className="control-group">
            <label>字体风格：</label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font.id} value={font.id}>
                  {font.name} ({font.style})
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>格子类型：</label>
            <select
              value={gridType}
              onChange={(e) => setGridType(e.target.value)}
            >
              <option value="tian">田字格</option>
              <option value="mi">米字格</option>
            </select>
          </div>

          <div className="control-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={showPinyin}
                onChange={(e) => setShowPinyin(e.target.checked)}
              />
              显示拼音
            </label>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-clear" onClick={handleClear}>
            清空
          </button>
          <button className="btn btn-print" onClick={handlePrint}>
            打印字帖
          </button>
        </div>
      </div>

      <div className="practice-area">
        {practiceLines.length > 0 ? (
          <div className="practice-lines">
            {practiceLines.map((lineCells, lineIndex) => (
              <div key={lineIndex} className="grid-line">
                {lineCells.map((cell) => (
                  <div
                    key={cell.key}
                    className={`practice-cell ${gridType}-grid ${cell.isSample ? 'sample' : 'practice'}`}
                    style={{ fontFamily: currentFont }}
                  >
                    <div className="cell-content">
                      {cell.isSample && (
                        <span className="sample-char">{cell.char}</span>
                      )}
                    </div>
                    {/* 田字格辅助线 */}
                    <div className="grid-lines">
                      <div className="horizontal-line"></div>
                      <div className="vertical-line"></div>
                      {gridType === 'mi' && (
                        <>
                          <div className="diagonal-line-1"></div>
                          <div className="diagonal-line-2"></div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>请输入要练习的汉字（支持多行输入）</p>
          </div>
        )}
      </div>

      <footer className="app-footer no-print">
        <p>提示：第一个格子为范字，后续为空白练习格</p>
      </footer>
    </div>
  )
}

export default App
