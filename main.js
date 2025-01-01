const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let cat;
let foodButton;
let foodCount = 0;
let catStage = 0;
let dialogueText;

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('cat1', 'assets/cat_stage1.png');
    this.load.image('cat2', 'assets/cat_stage2.png');
    this.load.image('cat3', 'assets/cat_stage3.png');
    this.load.image('food', 'assets/food.png');
}

function create() {
    // 背景
    this.add.image(400, 300, 'background');

    // 小猫
    cat = this.add.sprite(400, 300, 'cat1').setScale(0.5);

    // 食物按钮
    foodButton = this.add.sprite(100, 500, 'food').setScale(0.5).setInteractive();
    foodButton.on('pointerdown', feedCat);

    // 对话框
    dialogueText = this.add.text(50, 50, '小猫看着你，眼里充满期待~', {
        font: '20px Arial',
        fill: '#000'
    });
}

function feedCat() {
    foodCount++;
    dialogueText.setText(randomDialogue());

    if (foodCount >= 5 && catStage < 2) {
        catStage++;
        foodCount = 0;
        dialogueText.setText('小猫长大了一点！');

        switch (catStage) {
            case 1:
                cat.setTexture('cat2');
                break;
            case 2:
                cat.setTexture('cat3');
                break;
        }
    }
}

function randomDialogue() {
    const dialogues = [
        "喵~好好吃！",
        "小猫开心地摇尾巴~",
        "喵呜~再来一点！"
    ];
    return dialogues[Math.floor(Math.random() * dialogues.length)];
}

function update() {
    // 可选：添加动画或逻辑
}
