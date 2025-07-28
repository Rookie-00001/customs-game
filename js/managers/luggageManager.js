// 行李管理器
const LuggageManager = {
    loadLuggageItems: function(items) {
        const luggageContent = Utils.getElement('luggage-content');
        const luggageContentDetail = Utils.getElement('luggage-content-detail');
        const xrayView = Utils.getElement('x-ray-view');
        
        if (luggageContent) luggageContent.innerHTML = '';
        if (luggageContentDetail) luggageContentDetail.innerHTML = '';
        if (xrayView) xrayView.innerHTML = '';
        
        items.forEach((item, index) => {
            this.createLuggageItem(item, index, luggageContent, luggageContentDetail, xrayView);
        });
    },
    
    createLuggageItem: function(item, index, container, detailContainer, xrayContainer) {
        const itemElement = document.createElement('div');
        itemElement.className = 'luggage-item';
        itemElement.dataset.index = index;
        itemElement.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-label">${item.label}</div>
        `;
        
        const itemElementDetail = itemElement.cloneNode(true);
        itemElementDetail.addEventListener('click', () => this.selectItem(itemElementDetail, item, index));
        
        if (container) container.appendChild(itemElement);
        if (detailContainer) detailContainer.appendChild(itemElementDetail);
        
        this.createXRayItem(item, index, xrayContainer);
    },
    
    createXRayItem: function(item, index, container) {
        if (!container) return;
        
        const xrayItem = document.createElement('div');
        xrayItem.className = 'x-ray-item';
        
        const row = Math.floor(index / 3);
        const col = index % 3;
        xrayItem.style.left = (col * 33.33 + 5) + '%';
        xrayItem.style.top = (row * 50 + 10) + '%';
        xrayItem.style.width = '25%';
        xrayItem.style.height = '35%';
        
        xrayItem.innerHTML = item.xrayShape || `[未知物体]`;
        container.appendChild(xrayItem);
    },
    
    // 修改这个方法 - 只存储物品名称（label）
    selectItem: function(element, item, index) {
        if (GameState.isTimedOut || GameState.isPaused) return;
        
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            // 移除时使用 label 比较
            GameState.selectedItems = GameState.selectedItems.filter(selectedLabel => selectedLabel !== item.label);
            PassengerManager.updateNervousness(GameState.currentNervousness - 5);
        } else {
            element.classList.add('selected');
            // 只存储物品的 label（字符串）
            GameState.selectedItems.push(item.label);
            PassengerManager.updateNervousness(GameState.currentNervousness + 8);
        }
        
        console.log('当前选择的物品:', GameState.selectedItems);
    }
};